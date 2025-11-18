import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  verifyUserEmail,
  registerUser,
  authenticateUser
} from './userController';
// Import express types for middleware functions
import { Request, Response, NextFunction } from 'express';

// Temporary middleware placeholders
// These will be implemented when we set up the actual API routes
const isAuthenticated = (_req: Request, _res: Response, next: NextFunction): void => next();
const isAdmin = (_req: Request, _res: Response, next: NextFunction): void => next();

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authenticateUser);

// Protected routes - require authentication
router.get('/', isAuthenticated, isAdmin, getUsers);
router.get('/:id', isAuthenticated, getUserById);
router.post('/', isAuthenticated, isAdmin, createUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);
router.patch('/:id/status', isAuthenticated, isAdmin, updateUserStatus);
router.patch('/:id/verify-email', isAuthenticated, isAdmin, verifyUserEmail);

export default router;
