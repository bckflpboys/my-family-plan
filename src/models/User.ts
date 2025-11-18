import mongoose, { Schema } from 'mongoose';

// Define the User interface
export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  nickname?: string;
  email: string;
  password: string;
  profilePicture?: string;
  emailVerified: Date | null;
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  createdAt: Date;
  updatedAt: Date;
  role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't include password in query results by default
    },
    profilePicture: {
      type: String,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'banned'],
      default: 'active',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model if it doesn't exist already
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
