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

describe('Order Controller', () => {

    it('should get all orders', async () => {
        const res = await request(app)
            .get('/api/orders')
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('orders');
        expect(res.body.orders.length).toBeGreaterThan(0);  // Verificamos que haya pedidos
    });

    it('should get an order by ID', async () => {
        const res = await request(app)
            .get('/api/orders/1') // Asumimos que el primer pedido tiene ID = 1
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('order');
        expect(res.body.order).toHaveProperty('id', 1);
        expect(res.body.order).toHaveProperty('status', 'pending'); // Estado del pedido por defecto
    });

    it('should create a new order', async () => {
        const newOrder = {
            user_id: 1, // Asumimos que el usuario con ID 1 existe
            total: 199.99,
            status: 'pending'
        };

        const res = await request(app)
            .post('/api/orders')
            .send(newOrder);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Orden creada');
        expect(res.body.order).toHaveProperty('id'); // El ID del nuevo pedido debería existir
        expect(res.body.order).toHaveProperty('status', 'pending');
        expect(res.body.order).toHaveProperty('total', 199.99);
    });

    it('should update an existing order', async () => {
        const updatedOrder = {
            total: 299.99,
            status: 'paid'
        };

        const res = await request(app)
            .put('/api/orders/1') // Asumimos que el pedido con ID 1 existe
            .send(updatedOrder);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Orden actualizada');
        expect(res.body.order).toHaveProperty('id', 1);
        expect(res.body.order).toHaveProperty('status', 'paid');
        expect(res.body.order).toHaveProperty('total', 299.99);
    });

    it('should not update order with invalid status', async () => {
        const updatedOrder = {
            total: 199.99,
            status: 'invalid_status' // Estado no válido
        };

        const res = await request(app)
            .put('/api/orders/1') // Asumimos que el pedido con ID 1 existe
            .send(updatedOrder);

        expect(res.status).toBe(400); // Debe devolver un error 400 por estado inválido
        expect(res.body).toHaveProperty('message', 'Estado inválido');
    });
});
