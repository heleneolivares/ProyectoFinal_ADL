import request from 'supertest';
import app from '../app.js';
import { connectDb } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let token;
let testUserId;
let testItemId;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const db = await connectDb();

    // Crear tabla users si no existe
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user');
    `);

    // Crear tabla cart si no existe
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

    // Insertar usuario de prueba
    // Insertar un usuario con password hasheado
    const hashedPassword = await bcrypt.hash('123456', 10);
    await db.run(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Usuario Test', 'testcart2@example.com', ?, 'user')
    `, [hashedPassword]);
    const user = await db.get('SELECT * FROM users WHERE email = ?', ['testcart2@example.com']);
    testUserId = user.id;

    // Generar token de autenticación
    token = jwt.sign({ id: testUserId }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
});

afterAll(async () => {
    const db = await connectDb();
    await db.run('DELETE FROM cart');
    await db.run('DELETE FROM users');
    await db.close();  // Asegúrate de cerrar la conexión a la base de datos
});

describe('Cart Controller', () => {
    it('GET /api/v1/cart - debería retornar el carrito del usuario (vacío)', async () => {
        const res = await request(app)
            .get('/api/v1/cart')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('cart');
        expect(Array.isArray(res.body.cart)).toBe(true);
        expect(res.body.cart.length).toBe(0);
    });

    it('POST /api/v1/cart - debería agregar un producto al carrito', async () => {
        const res = await request(app)
            .post('/api/v1/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ product_id: 1, quantity: 2 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');

        // Obtener el ID del item recién insertado
        const db = await connectDb();
        const item = await db.get('SELECT * FROM cart WHERE user_id = ?', [testUserId]);
        testItemId = item.id;
    });

    it('PUT /api/v1/cart/:id - debería actualizar la cantidad del producto', async () => {
        const res = await request(app)
            .put(`/api/v1/cart/${testItemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 5 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/actualizado/);
    });

    it('DELETE /api/v1/cart/:id - debería eliminar el producto del carrito', async () => {
        const res = await request(app)
            .delete(`/api/v1/cart/${testItemId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/eliminado/);
    });
});
