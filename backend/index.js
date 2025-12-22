// server.js
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/logindb';

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: user._id, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Protected route - Get user profile
app.get('/api/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
