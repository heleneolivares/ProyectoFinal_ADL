// routes/productRoutes.js
import express from 'express';
import * as productController from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Products
routes.get('/products', productController.getProducts);
routes.get('/products/:id', productController.getProduct);
routes.post('/products', authMiddleware, productController.createProduct);
routes.put('/products/:id', authMiddleware, productController.updateProduct);
routes.delete('/products/:id', authMiddleware, productController.deleteProduct);

export default routes;