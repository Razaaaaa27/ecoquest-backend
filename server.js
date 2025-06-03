const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// 📦 Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const challengeRoutes = require('./routes/challenges');
const forestRoutes = require('./routes/forest');
const communityRoutes = require('./routes/community');
const leaderboardRoutes = require('./routes/Leaderboard');
const ecoEduRoutes = require('./routes/ecoedu');
const adminRoutes = require('./routes/admin');
const submissionRoutes = require('./routes/submissions');

// 🛡️ Middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// 🔐 Security
app.use(helmet());
app.use(compression());

// 🌐 CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🧠 Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 📜 Logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

// 🩺 Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'EcoQuest API is running successfully!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 📚 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/forest', forestRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/ecoedu', ecoEduRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/submissions', submissionRoutes);

// 🔍 API Documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'EcoQuest API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      challenges: '/api/challenges',
      forest: '/api/forest',
      community: '/api/community',
      leaderboard: '/api/leaderboard',
      ecoedu: '/api/ecoedu',
      admin: '/api/admin',
      submissions: '/api/submissions',
      uploads: '/uploads' // ADD: Document uploads endpoint
    }
  });
});

// ❌ Error Handlers
app.use(notFound);
app.use(errorHandler);

// For Vercel, we export the app instead of listening
module.exports = app;