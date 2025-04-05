// routes.js
import express from 'express';
import * as authController from './controllers/authController.js';
import * as userController from './controllers/userController.js';
import * as productController from './controllers/productController.js';
import * as cartController from './controllers/cartController.js';
import * as orderController from './controllers/orderController.js';
import * as favoriteController from './controllers/favoriteController.js';
import authMiddleware from './middlewares/authMiddleware.js';

const router = express.Router();

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', authMiddleware, authController.profile);

// Users
router.get('/users/:id', authMiddleware, userController.getUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

// Products
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products', authMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// Cart
router.get('/cart', authMiddleware, cartController.getCart);
router.post('/cart', authMiddleware, cartController.addToCart);
router.put('/cart/:id', authMiddleware, cartController.updateCartItem);
router.delete('/cart/:id', authMiddleware, cartController.removeCartItem);

// Orders
router.get('/orders', authMiddleware, orderController.getOrders);
router.get('/orders/:id', authMiddleware, orderController.getOrder);
router.post('/orders', authMiddleware, orderController.createOrder);
router.put('/orders/:id', authMiddleware, orderController.updateOrder);

// Favorites
router.get('/favorites', authMiddleware, favoriteController.getFavorites);
router.post('/favorites', authMiddleware, favoriteController.addFavorite);
router.delete('/favorites/:product_id', authMiddleware, favoriteController.removeFavorite);

export default router;
