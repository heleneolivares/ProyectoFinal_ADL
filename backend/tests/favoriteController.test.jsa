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

describe('Favorite Controller', () => {

    it('should get the favorites of a user', async () => {
        const res = await request(app)
            .get('/api/favorites')
            .set('Authorization', 'Bearer some-valid-token') // Asumiendo que tienes un token válido para el usuario
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('favorites');
        expect(Array.isArray(res.body.favorites)).toBe(true); // Verificamos que la respuesta sea un array
    });

    it('should add a product to favorites', async () => {
        const favoriteItem = {
            user_id: 1, // Asumimos que el usuario con ID 1 existe
            product_id: 1 // Asumimos que el producto con ID 1 existe
        };

        const res = await request(app)
            .post('/api/favorites')
            .send(favoriteItem)
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Producto agregado a favoritos');
        expect(res.body.favorite).toHaveProperty('user_id', 1);
        expect(res.body.favorite).toHaveProperty('product_id', 1);
    });

    it('should not add the same product to favorites twice', async () => {
        const favoriteItem = {
            user_id: 1, // Asumimos que el usuario con ID 1 existe
            product_id: 1 // Asumimos que el producto con ID 1 existe
        };

        // Primero lo agregamos
        await request(app)
            .post('/api/favorites')
            .send(favoriteItem)
            .set('Authorization', 'Bearer some-valid-token');

        // Intentamos agregarlo de nuevo
        const res = await request(app)
            .post('/api/favorites')
            .send(favoriteItem)
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(400); // Debe devolver un error porque el producto ya está en favoritos
        expect(res.body).toHaveProperty('message', 'Producto ya está en favoritos');
    });

    it('should remove a product from favorites', async () => {
        const favoriteItem = {
            user_id: 1, // Asumimos que el usuario con ID 1 existe
            product_id: 1 // Asumimos que el producto con ID 1 existe
        };

        // Primero agregamos el producto a favoritos
        await request(app)
            .post('/api/favorites')
            .send(favoriteItem)
            .set('Authorization', 'Bearer some-valid-token');

        // Ahora lo eliminamos
        const res = await request(app)
            .delete('/api/favorites/1') // Asumimos que el ID del producto en favoritos es 1
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Producto 1 eliminado de favoritos');
    });

    it('should not remove a product from favorites if it is not in the list', async () => {
        const res = await request(app)
            .delete('/api/favorites/9999') // ID que no existe
            .set('Authorization', 'Bearer some-valid-token');

        expect(res.status).toBe(404); // No debe encontrar el producto en favoritos
        expect(res.body).toHaveProperty('message', 'Producto 9999 no encontrado en favoritos');
    });
});
