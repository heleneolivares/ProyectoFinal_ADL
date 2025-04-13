// routes/index.js
import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import favoriteRoutes from './favoriteRoutes.js';

const routes = express.Router();

// Montar rutas específicas en su prefijo correspondiente
routes.use('/api/v1', authRoutes);
routes.use('/api/v1', userRoutes);
routes.use('/api/v1', productRoutes);
routes.use('/api/v1', cartRoutes);
routes.use('/api/v1', orderRoutes);
routes.use('/api/v1', favoriteRoutes);

// Catch-all para rutas no encontradas
routes.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default routes;