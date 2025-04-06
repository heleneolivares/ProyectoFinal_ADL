import { connectDb } from '../config/db.js';

const isTest = process.env.NODE_ENV === 'test';
let db;
// Obtener un usuario por ID
export const getUser = async (req, res) => {
    const userId = req.params.id;
    db = await connectDb();

    try {
        let user;

        if (isTest) {
            user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
        } else {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
            user = result.rows[0];
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    try {
        if (isTest) {
            await db.run(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [name, email, userId]
            );
        } else {
            await db.query(
                'UPDATE users SET name = $1, email = $2 WHERE id = $3',
                [name, email, userId]
            );
        }

        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        if (isTest) {
            await db.run('DELETE FROM users WHERE id = ?', [userId]);
        } else {
            await db.query('DELETE FROM users WHERE id = $1', [userId]);
        }

        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
