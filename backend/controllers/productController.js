import { connectDb } from '../config/db.js';

const isTest = process.env.NODE_ENV === 'test';
let db;
// Obtener todos los productos
export const getProducts = async (req, res) => {
    db = await connectDb();
    try {
        let products;
        if (isTest) {
            products = await db.all('SELECT * FROM products');
        } else {
            const result = await db.query('SELECT * FROM products');
            products = result.rows;
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        let product;
        if (isTest) {
            product = await db.get('SELECT * FROM products WHERE id = ?', [productId]);
        } else {
            const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
            product = result.rows[0];
        }

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        if (isTest) {
            await db.run(
                'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
                [name, description, price]
            );
        } else {
            await db.query(
                'INSERT INTO products (name, description, price) VALUES ($1, $2, $3)',
                [name, description, price]
            );
        }

        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    try {
        if (isTest) {
            await db.run(
                'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
                [name, description, price, productId]
            );
        } else {
            await db.query(
                'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4',
                [name, description, price, productId]
            );
        }

        res.status(200).json({ message: `Producto ${productId} actualizado` });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        if (isTest) {
            await db.run('DELETE FROM products WHERE id = ?', [productId]);
        } else {
            await db.query('DELETE FROM products WHERE id = $1', [productId]);
        }

        res.status(200).json({ message: `Producto ${productId} eliminado` });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
