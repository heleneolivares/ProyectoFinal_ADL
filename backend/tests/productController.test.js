import request from 'supertest';
import app from '../app.js';
import { connectDb } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let testProductId;
let authToken; 

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const db = await connectDb();

    // Crear tabla products si no existe
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL
        );
    `);
    const hashedPassword = await bcrypt.hash('123456', 10);
    await db.run(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Usuario Test', 'testcart@example.com', ?, 'user')
    `, [hashedPassword]);
    const user = await db.get('SELECT * FROM users WHERE email = ?', ['testcart@example.com']);

    // Generar token de autenticación
    authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });

     // Login para obtener el token
     const loginRes = await request(app)
     .post('/api/v1/auth/login')
     .send({
         email: 'testcart@example.com', // Correo de usuario de prueba
         password: '123456' // Contraseña de usuario de prueba
     });

    expect(loginRes.statusCode).toBe(200);
    authToken = loginRes.body.token; 

    await db.run(`
        INSERT INTO products (name, description, price)
        VALUES ('Funko Test', 'Funko descripcion', '10.33')
    `);
});

afterAll(async () => {
    const db = await connectDb();
    await db.run('DELETE FROM products');
    await db.run('DELETE FROM users');
    await db.close();  // Asegúrate de cerrar la conexión a la base de datos
});

describe('Product Controller', () => {
    it('GET /api/v1/products - debería retornar todos los productos', async () => {
        const res = await request(app).get('/api/v1/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /api/v1/products/:id - debería retornar un producto por su ID', async () => {
        const createRes = await request(app)
            .post('/api/v1/products')
            .send({
                name: 'Producto Test',
                description: 'Descripción del producto',
                price: 100
            })
            .set('Authorization', `Bearer ${authToken}`);  // Incluir el token para POST

        expect(createRes.statusCode).toBe(201);
        
        const db = await connectDb();
        const product = await db.get('SELECT * FROM products WHERE name = ?', ['Producto Test']);
        testProductId = product.id;

        const res = await request(app)
            .get(`/api/v1/products/${testProductId}`);  // No incluir token para GET

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Producto Test');
        expect(res.body).toHaveProperty('description', 'Descripción del producto');
        expect(res.body).toHaveProperty('price', 100);
    });

    it('POST /api/v1/products - debería crear un nuevo producto', async () => {
        const res = await request(app)
            .post('/api/v1/products')
            .send({
                name: 'Nuevo Producto',
                description: 'Descripción del nuevo producto',
                price: 50
            })
            .set('Authorization', `Bearer ${authToken}`);  // Incluir token para POST

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Producto creado');

        const db = await connectDb();
        const product = await db.get('SELECT * FROM products WHERE name = ?', ['Nuevo Producto']);
        testProductId = product.id;
    });

    it('PUT /api/v1/products/:id - debería actualizar un producto existente', async () => {
        const res = await request(app)
            .put(`/api/v1/products/${testProductId}`)
            .send({
                name: 'Producto Actualizado',
                description: 'Descripción actualizada',
                price: 120
            })
            .set('Authorization', `Bearer ${authToken}`);  // Incluir token para PUT

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/actualizado/);

        const db = await connectDb();
        const product = await db.get('SELECT * FROM products WHERE id = ?', [testProductId]);
        expect(product.name).toBe('Producto Actualizado');
        expect(product.description).toBe('Descripción actualizada');
        expect(product.price).toBe(120);
    });

    it('DELETE /api/v1/products/:id - debería eliminar un producto', async () => {
        const res = await request(app)
            .delete(`/api/v1/products/${testProductId}`)
            .set('Authorization', `Bearer ${authToken}`);  // Incluir token para DELETE

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/eliminado/);

        const db = await connectDb();
        const product = await db.get('SELECT * FROM products WHERE id = ?', [testProductId]);
        expect(product).toBeUndefined();
    });
});
