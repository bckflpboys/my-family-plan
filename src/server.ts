import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './api/users/userRoutes';
import dbConnect from './utils/database';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.API_PORT || 5000;

// Connect to MongoDB
dbConnect().then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
