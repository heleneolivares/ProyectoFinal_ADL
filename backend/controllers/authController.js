import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// REGISTER
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at`,
        [name, email, hashedPassword, role || 'user']
        );

        res.status(201).json({
        message: 'Usuario registrado con éxito',
        user: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') {
        return res.status(400).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
        return res.status(401).json({ error: 'Email o contraseña inválidos' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
        return res.status(401).json({ error: 'Email o contraseña inválidos' });
        }

        const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        );

        res.status(200).json({
        message: 'Login exitoso',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// PROFILE
export const profile = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];

        if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({
        message: 'Perfil obtenido correctamente',
        user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};