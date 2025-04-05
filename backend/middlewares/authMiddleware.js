import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Puedes agregar más lógica si quieres validar el usuario en la base de datos
    req.user = decoded; // Esto estará disponible en los controladores como req.user

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
  }
};

export default authMiddleware;
