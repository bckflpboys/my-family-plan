import { Request, Response, NextFunction } from 'express';
import { getSession } from 'next-auth/react';
import User from '../../models/User';

// Import the User type
import { IUser } from '../../models/User';

// Extend Express Request type to include user with proper typing
// Using module augmentation pattern instead of global declaration
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

// Middleware to check if user is authenticated
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get session from NextAuth
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ success: false, error: 'Not authorized, please login' });
    }
    
    // Find the user in our database
    const user = await User.findOne({ email: session.user?.email });
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found in database' });
    }
    
    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        error: `Your account is ${user.status}. Please contact an administrator.` 
      });
    }
    
    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Middleware to check if user is an admin
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, error: 'Access denied. Admin privileges required.' });
  }
};
