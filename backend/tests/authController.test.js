// tests/authController.test.js
import request from 'supertest';
import { connectDb } from '../config/db.js';
import bcrypt from 'bcryptjs';
import app from '../app.js';

let db;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const db = await connectDb();

    // Crear la tabla users si no existe
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
        )
    `);

    // Insertar un usuario con password hasheado
    const hashedPassword = await bcrypt.hash('123456', 10);
    await db.run(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Usuario Test', 'test@example.com', ?, 'user')
    `, [hashedPassword]);
});

afterAll(async () => {
    const db = await connectDb();  // Asegúrate de que db esté bien asignada
    await db.run('DELETE FROM users'); // Limpiar la tabla users
    await db.close();  // Asegúrate de cerrar la conexión
});

describe('POST /api/v1/auth/login', () => {
    it('debería autenticar con credenciales válidas', async () => {
        const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'test@example.com',
            password: '123456'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('debería fallar con contraseña incorrecta', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@example.com',
                password: 'contraseñaIncorrecta'
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message');
    });

    it('debería fallar con email no existente', async () => {
        const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'inexistente@example.com',
            password: '123456'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message');
    });
});
