import { connectDb } from '../config/db.js';

const isTest = process.env.NODE_ENV === 'test';
let db;
// Obtener carrito del usuario
export const getCart = async (req, res) => {
    db = await connectDb();
    const userId = req.user.id;  // Suponiendo que el usuario está autenticado

    try {
        let cart;
        if (isTest) {
            cart = await db.all('SELECT * FROM cart WHERE user_id = ?', [userId]);
        } else {
            const result = await db.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
            cart = result.rows;
        }

        res.status(200).json({ message: 'Carrito del usuario', cart });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = req.user.id;  // Suponiendo que el usuario está autenticado

    try {
        if (isTest) {
            await db.run(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, product_id, quantity]
            );
        } else {
            await db.query(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)',
                [userId, product_id, quantity]
            );
        }

        res.status(201).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Actualizar un producto en el carrito
export const updateCartItem = async (req, res) => {
    const itemId = req.params.id;
    const { quantity } = req.body;

    try {
        if (isTest) {
        await db.run(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [quantity, itemId]
        );
        } else {
        await db.query(
            'UPDATE cart SET quantity = $1 WHERE id = $2',
            [quantity, itemId]
        );
        }

        res.status(200).json({ message: `Producto del carrito ${itemId} actualizado` });
    } catch (error) {
        console.error('Error al actualizar producto en el carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Eliminar un producto del carrito
export const removeCartItem = async (req, res) => {
    const itemId = req.params.id;

    try {
        if (isTest) {
            await db.run('DELETE FROM cart WHERE id = ?', [itemId]);
        } else {
            await db.query('DELETE FROM cart WHERE id = $1', [itemId]);
        }

        res.status(200).json({ message: `Producto del carrito ${itemId} eliminado` });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
