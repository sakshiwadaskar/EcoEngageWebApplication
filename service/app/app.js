import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js';

dotenv.config(); // Load environment variables

const connectToDatabase = async () => {
  const mongoURI = process.env.MONGO_CONNECTION;

  if (!mongoURI) {
    console.error('MongoDB connection URI is undefined. Please set the MONGO_CONNECTION environment variable.');
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Successfully connected to MongoDB using Mongoose!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    // Continue running the server even if the DB connection fails
  }
};

const init = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

  connectToDatabase(); // Attempt to connect to MongoDB

  initRoutes(app);
};

export default init;
