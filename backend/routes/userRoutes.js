// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

// Users
routes.get('/users/:id', authMiddleware, userController.getUser);
routes.put('/users/:id', authMiddleware, userController.updateUser);
routes.delete('/users/:id', authMiddleware, userController.deleteUser);

export default routes;