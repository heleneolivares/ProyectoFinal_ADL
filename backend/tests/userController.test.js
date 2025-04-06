import { connectDb } from './setupTestDb';
import request from 'supertest';
import app from '../app'; // Asumiendo que tienes un archivo app.js donde defines tu servidor Express

let db;

beforeAll(async () => {
    db = await connectDb();
    // Configura la app para usar SQLite en las pruebas
});

afterAll(async () => {
    await db.close();
});

describe('User Controller', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                email: 'testuser@ejemplo.com',
                password: 'password123',
                role: 'user'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Usuario creado');
        expect(res.body.user).toHaveProperty('id');
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/users');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('users');
        expect(res.body.users.length).toBeGreaterThan(0);
    });

    // Agregar más pruebas de actualización y eliminación de usuarios
});
