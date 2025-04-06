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

describe('Product Controller', () => {

    it('should get all products', async () => {
        const res = await request(app)
            .get('/api/products')
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('products');
        expect(res.body.products.length).toBeGreaterThan(0);  // Verificamos que haya productos
    });

    it('should get a product by ID', async () => {
        const res = await request(app)
            .get('/api/products/1') // Asumimos que el primer producto tiene ID = 1
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('product');
        expect(res.body.product).toHaveProperty('id', 1);
        expect(res.body.product).toHaveProperty('name', 'Producto 1'); // Nombre del producto esperado
    });

    it('should create a new product', async () => {
        const newProduct = {
            sku: 'SKU99999',
            name: 'Producto Nuevo',
            description: 'Este es un producto nuevo',
            price: 199.99,
            stock: 50,
            category: 'Electrónica',
            color: 'Negro',
            image_url: 'https://ejemplo.com/imgnuevo.jpg'
        };

        const res = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Producto creado');
        expect(res.body.product).toHaveProperty('id'); // El ID del nuevo producto debería existir
        expect(res.body.product).toHaveProperty('name', 'Producto Nuevo');
        expect(res.body.product).toHaveProperty('price', 199.99);
    });

    it('should update an existing product', async () => {
        const updatedProduct = {
            name: 'Producto Actualizado',
            description: 'Descripción actualizada',
            price: 149.99,
            stock: 30,
            category: 'Electrónica',
            color: 'Blanco',
            image_url: 'https://ejemplo.com/imgactualizado.jpg'
        };

        const res = await request(app)
            .put('/api/products/1') // Asumimos que el producto con ID 1 existe
            .send(updatedProduct);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Producto actualizado');
        expect(res.body.product).toHaveProperty('id', 1);
        expect(res.body.product).toHaveProperty('name', 'Producto Actualizado');
        expect(res.body.product).toHaveProperty('price', 149.99);
    });

    it('should delete a product', async () => {
        const res = await request(app)
            .delete('/api/products/1') // Asumimos que el producto con ID 1 existe
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Producto eliminado');
    });
});
