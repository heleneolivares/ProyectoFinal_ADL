// routes/favoriteRoutes.js
import express from 'express';
import * as favoriteController from '../controllers/favoriteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Favorites
routes.get('/favorites', authMiddleware, favoriteController.getFavorites);
routes.post('/favorites', authMiddleware, favoriteController.addFavorite);
routes.delete('/favorites/:product_id', authMiddleware, favoriteController.removeFavorite);

export default routes;