import jwt from 'jsonwebtoken';
// controllers/authController.js
//const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const register = (req, res) => {
    res.status(201).json({ message: 'Usuario registrado' });
};
  
export const login = (req, res) => {
    res.status(200).json({ token: 'JWT-MOCK-TOKEN', message: 'Login exitoso' });
};
  
export const profile = (req, res) => {
    res.status(200).json({ message: 'Perfil del usuario', user: req.user });
};
  