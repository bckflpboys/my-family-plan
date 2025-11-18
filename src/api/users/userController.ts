import { Request, Response } from 'express';
import User, { IUser } from '../../models/User';
import dbConnect from '../../utils/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    await connectDB();
    const users = await User.find({}).select('-__v');
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const user = await User.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, nickname, email, password, profilePicture, status, role } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name,
      nickname,
      email,
      password: hashedPassword,
      profilePicture,
      status: status || 'active',
      role: role || 'user'
    });
    
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, nickname, email, password, profilePicture, status, emailVerified, role } = req.body;
    
    // Build update object with only provided fields
    const updateData: Partial<IUser> = {};
    if (name) updateData.name = name;
    if (nickname !== undefined) updateData.nickname = nickname;
    if (email) updateData.email = email;
    if (password) {
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;
    if (status) updateData.status = status;
    if (emailVerified !== undefined) updateData.emailVerified = emailVerified ? new Date() : null;
    if (role) updateData.role = role;
    
    // Find and update the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
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
};

// Authenticate a user
export const authenticateUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide email and password' 
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Include password field
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Check if user is active
    if (user.status !== 'active') {
      return res.status(401).json({ 
        success: false, 
        error: `Your account is ${user.status}. Please contact an administrator.` 
      });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
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
    
    return res.status(200).json({ 
      success: true, 
      data: userResponse,
      token 
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during authentication' 
    });
  }
};

// Update user status (activate, deactivate, suspend, ban)
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { status } = req.body;
    
    if (!status || !['active', 'inactive', 'suspended', 'banned'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid status. Must be one of: active, inactive, suspended, banned' 
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Verify user email
export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { emailVerified: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error verifying user email:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};
