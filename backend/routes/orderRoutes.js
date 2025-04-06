// routes/orderRoutes.js
import express from 'express';
import * as orderController from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Orders
routes.get('/orders', authMiddleware, orderController.getOrders);
routes.get('/orders/:id', authMiddleware, orderController.getOrder);
routes.post('/orders', authMiddleware, orderController.createOrder);
routes.put('/orders/:id', authMiddleware, orderController.updateOrder);

export default routes;