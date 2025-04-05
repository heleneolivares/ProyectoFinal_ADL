import pool from '../config/db.js';
// productController.js
export const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getProduct = (req, res) => {
    const productId = req.params.id;
    res.status(200).json({ message: `Producto con ID ${productId}`, product: {} });
};

export const createProduct = (req, res) => {
    const newProduct = req.body;
    res.status(201).json({ message: 'Producto creado', product: newProduct });
};

export const updateProduct = (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    res.status(200).json({ message: `Producto ${productId} actualizado`, updateData });
};

export const deleteProduct = (req, res) => {
    const productId = req.params.id;
    res.status(200).json({ message: `Producto ${productId} eliminado` });
};