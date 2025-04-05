import request from 'supertest';
import express from 'express';
import router from '../routes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1', router);

// Generar token de prueba (ajusta al user real en tu BD)
const token = jwt.sign({ id: 1, email: 'test@example.com' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
});

describe('API REST - Test de rutas', () => {
    test('GET /auth/profile sin token → 401', async () => {
        const res = await request(app).get('/api/v1/auth/profile');
        expect(res.statusCode).toBe(401);
    });

    test('GET /auth/profile con token válido → 200', async () => {
        const res = await request(app)
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test('POST /auth/register → 201', async () => {
        const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
            name: 'Nuevo Usuario',
            email: `user${Date.now()}@test.com`,
            password: '123456'
        });
        expect(res.statusCode).toBe(201);
    });

    test('GET /products → 200', async () => {
        const res = await request(app).get('/api/v1/products');
        expect(res.statusCode).toBe(200);
    });
});
