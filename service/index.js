import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import init from './app/app.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
init(app);

// Retrieve server connection details
app.get("/", (req, res) => {
  const serverDetails = {
    status: 'Server is running',
    port: port,
    environment: process.env.NODE_ENV || 'development',
    frontendURL: process.env.FRONTEND_SERVER_URL || 'Not set',
    mongoConnection: mongoose.connection.readyState === 1 ? 'Connected to MongoDB' : 'Not connected to MongoDB',
    mongoURI: process.env.MONGO_CONNECTION ? 'MongoDB URI set' : 'MongoDB URI not set',
  };

  res.json(serverDetails); // Send server details as JSON response
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

export default app;