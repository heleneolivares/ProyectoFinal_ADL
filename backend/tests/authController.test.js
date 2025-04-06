import { setupTestDb } from './setupTestDb';
import request from 'supertest';
import app from '../app'; // Asumiendo que tienes un archivo app.js donde defines tu servidor Express

let db;

beforeAll(async () => {
    db = await setupTestDb();
    // Configura la app para usar SQLite en las pruebas
});

afterAll(async () => {
    if (db && db.close) {
        await db.close(); // Esto solo es necesario para SQLite, no para PostgreSQL
    }
});

describe('Auth Controller', () => {
    it('should log in with valid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'juan@ejemplo.com',
                password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Autenticado exitosamente');
    });

    it('should fail login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'juan@ejemplo.com',
                password: 'incorrectpassword'
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Credenciales inválidas');
    });
});
