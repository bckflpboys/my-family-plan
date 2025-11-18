import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import dbConnect from '../../utils/database';

// Handler for user registration
export default async function handler(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await dbConnect();
    
    const { name, nickname, email, password, profilePicture } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields (name, email, password)' 
      });
    }
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'User with this email already exists' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = await User.create({
      name,
      nickname,
      email,
      password: hashedPassword,
      profilePicture,
      status: 'active', // Default status for new users
      role: 'user', // Default role
      emailVerified: null // Email not verified by default
    });
    
    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      status: user.status,
      role: user.role,
      emailVerified: user.emailVerified
    };
    
    return res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
}
