import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js';

const connectToDatabase = async (mongoURI) => {
  console.log('MongoDB URI:', process.env.MONGO_CONNECTION);

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 100000, // 50 seconds timeout for server selection
    });
    console.log('Successfully connected to MongoDB using Mongoose!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    // process.exit(1); // Commented out to prevent app crash
  }
};

const init = (app) => {
  // Middleware setup
  const allowedOrigins = [
    'https://eco-engage-web-application.vercel.app', // Add your frontend URL without trailing /
    // Add other origins if needed
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies, headers)
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

  // MongoDB URI from environment variables
  const mongoURI = process.env.MONGO_CONNECTION;

  // Connect to MongoDB
  connectToDatabase(mongoURI);

  // Initialize application routes
  initRoutes(app);
};

export default init;