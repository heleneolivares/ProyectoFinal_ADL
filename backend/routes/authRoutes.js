// routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Auth
routes.post('/auth/register', authController.register);
routes.post('/auth/login', authController.login);
routes.get('/auth/profile', authMiddleware, authController.profile);

export default routes;