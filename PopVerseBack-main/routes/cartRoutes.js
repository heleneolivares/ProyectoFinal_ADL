// routes/cartRoutes.js
import express from 'express';
import * as cartController from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Cart
routes.get('/cart', authMiddleware, cartController.getCart);
routes.post('/cart', authMiddleware, cartController.addToCart);
routes.put('/cart/:id', authMiddleware, cartController.updateCartItem);
routes.delete('/cart/:id', authMiddleware, cartController.removeCartItem);

export default routes;