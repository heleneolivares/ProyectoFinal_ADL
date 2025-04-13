import request from 'supertest';
import app from '../app.js';
import { connectDb } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let testFavoriteId;
let authToken; 
const userId = 1;  // Simulamos un ID de usuario
const productId = 100;  // Simulamos un ID de producto

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const db = await connectDb();

    // Crear tablas si no existen
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
    `);

    // Crear un usuario de prueba
    const hashedPassword = await bcrypt.hash('123456', 10);
    await db.run(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Usuario Test', 'testfavorite@example.com', ?, 'user')
    `, [hashedPassword]);
    const user = await db.get('SELECT * FROM users WHERE email = ?', ['testfavorite@example.com']);

    // Generar token de autenticación
    authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });

    // Login para obtener el token
    const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'testfavorite@example.com',
            password: '123456'
        });

    expect(loginRes.statusCode).toBe(200);
    authToken = loginRes.body.token;

    // Insertar un producto de prueba en favoritos
    await db.run(`
        INSERT INTO favorites (user_id, product_id)
        VALUES (?, ?)
    `, [user.id, productId]);

    const favorite = await db.get('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [user.id, productId]);
    testFavoriteId = favorite.id;
});

afterAll(async () => {
    const db = await connectDb();
    await db.run('DELETE FROM favorites');
    await db.run('DELETE FROM users');
    await db.close();  // Asegúrate de cerrar la conexión a la base de datos
});

describe('Favorite Controller', () => {
    it('GET /api/v1/favorites - debería retornar los favoritos del usuario', async () => {
        const res = await request(app)
            .get('/api/v1/favorites')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.favorites)).toBe(true);
    });

    it('POST /api/v1/favorites - debería agregar un producto a favoritos', async () => {
        const res = await request(app)
            .post('/api/v1/favorites')
            .send({ product_id: productId })
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Producto agregado a favoritos');
    });

    it('DELETE /api/v1/favorites/:product_id - debería eliminar un producto de favoritos', async () => {
        const res = await request(app)
            .delete(`/api/v1/favorites/${productId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(`Producto ${productId} eliminado de favoritos`);

        const db = await connectDb();
        const favorite = await db.get('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [userId, productId]);
        expect(favorite).toBeUndefined();
    });
});
