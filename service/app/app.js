import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js';

const init = (app) => {
  // Middleware setup
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

  // MongoDB URI from environment variables
  const mongoURI = process.env.MONGO_CONNECTION;

  // Mongoose connection to MongoDB cluster
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,           // Use the new MongoDB connection string parser
    useUnifiedTopology: true,        // Opt into using the new connection management engine
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
  })
    .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1); // Exit if connection fails
    });

  // Initialize application routes
  initRoutes(app);
}

export default init;
