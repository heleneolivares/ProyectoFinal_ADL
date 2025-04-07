import { connectDb } from '../config/db.js';

const isTest = process.env.NODE_ENV === 'test';
let db;
// Obtener todas las órdenes
export const getOrders = async (req, res) => {
    db = await connectDb();
    try {
        let orders;
        if (isTest) {
            orders = await db.all('SELECT * FROM orders');
        } else {
            const result = await db.query('SELECT * FROM orders');
            orders = result.rows;
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Obtener una orden por ID
export const getOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        let order;
        if (isTest) {
            order = await db.get('SELECT * FROM orders WHERE id = ?', [orderId]);
        } else {
            const result = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
            order = result.rows[0];
        }

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const createOrder = async (req, res) => {
    const { user_id, product_ids, total_price, status } = req.body;
  
    try {
        if (isTest) {
            await db.run(
                'INSERT INTO orders (user_id, product_ids, total_price, status) VALUES (?, ?, ?, ?)',
                [user_id, JSON.stringify(product_ids), total_price, status]
            );
        } else {
            await db.query(
                'INSERT INTO orders (user_id, product_ids, total_price, status) VALUES ($1, $2, $3, $4)',
                [user_id, JSON.stringify(product_ids), total_price, status]
            );
        }
    
        res.status(201).json({ message: 'Orden creada' });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Actualizar una orden
export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { product_ids, total_price, status } = req.body;
  
    try {
        if (isTest) {
            await db.run(
                'UPDATE orders SET product_ids = ?, total_price = ?, status = ? WHERE id = ?',
                [JSON.stringify(product_ids), total_price, status, orderId]
            );
        } else {
            await db.query(
                'UPDATE orders SET product_ids = $1, total_price = $2, status = $3 WHERE id = $4',
                [JSON.stringify(product_ids), total_price, status, orderId]
            );
        }
  
        res.status(200).json({ message: `Orden ${orderId} actualizada` });
    } catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};