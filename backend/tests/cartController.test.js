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

describe('Cart Controller', () => {

    it('should get the cart of a user', async () => {
        const res = await request(app)
            .get('/api/cart')
            .set('Authorization', 'Bearer some-valid-token') // Asumiendo que tienes un token válido para el usuario
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('cart');
        expect(Array.isArray(res.body.cart)).toBe(true); // Verificamos que la respuesta sea un array
    });

    it('should add a product to the cart', async () => {
        const newItem = {
            user_id: 1, // Asumimos que el usuario con ID 1 existe
            product_id: 1, // Asumimos que el producto con ID 1 existe
            quantity: 2,
            address: '123 Main St'
        };

        const res = await request(app)
            .post('/api/cart')
            .send(newItem)
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Producto agregado al carrito');
        expect(res.body.item).toHaveProperty('user_id', 1);
        expect(res.body.item).toHaveProperty('product_id', 1);
        expect(res.body.item).toHaveProperty('quantity', 2);
    });

    it('should update the quantity of an item in the cart', async () => {
        const updatedItem = {
            quantity: 3 // Actualizamos la cantidad a 3
        };

        const res = await request(app)
            .put('/api/cart/1') // Asumimos que el ítem con ID 1 existe
            .send(updatedItem)
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Producto del carrito 1 actualizado');
        expect(res.body.updateData).toHaveProperty('quantity', 3);
    });

    it('should not update the quantity to an invalid value', async () => {
        const updatedItem = {
            quantity: -1 // Valor no válido para la cantidad
        };

        const res = await request(app)
            .put('/api/cart/1') // Asumimos que el ítem con ID 1 existe
            .send(updatedItem)
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(400); // Debe devolver un error 400 por cantidad inválida
        expect(res.body).toHaveProperty('message', 'Cantidad inválida');
    });

    it('should remove an item from the cart', async () => {
        const res = await request(app)
            .delete('/api/cart/1') // Asumimos que el ítem con ID 1 existe
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Producto del carrito 1 eliminado');
    });

    it('should not remove an item with an invalid ID', async () => {
        const res = await request(app)
            .delete('/api/cart/9999') // ID inválido
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(404); // No debe encontrar el ítem
        expect(res.body).toHaveProperty('message', 'Producto del carrito 9999 no encontrado');
    });
});
