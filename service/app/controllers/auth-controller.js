import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, updateUserService, getUserById, updateUserPassword } from "../services/auth-service.js";
import { setResponse, setError } from './response-handler.js';
import mongoose from 'mongoose';
import User from "../model/user.js";


const saltRounds = 10;

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return setError('User already exists', res);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user id
    const userId = new mongoose.Types.ObjectId();

    // Create a new user using the createUser service
    const newUser = await createUser({
      userId: userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      language: 'en',
      bio: 'sample bio',
    });

    const secretKey = process.env.JWT_SECRET;

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email, userId: userId, firstName: firstName, lastName: lastName }, secretKey, {
      expiresIn: '10d', // Token expiration time
    });

    // Respond with the access token
    setResponse({ accessToken: token }, res);
  } catch (err) {
    setError(err, res);
    console.log(err);
  }
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return setError('No User with this email', res);
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return setError('Invalid credentials', res);
    }

    const secretKey = process.env.JWT_SECRET;

    // Generate JWT token
    const token = jwt.sign({ email: user.email, userId: user.userId, firstName: user.firstName, lastName: user.lastName }, secretKey, {
      expiresIn: '24h', // Token expiration time
    });

    // Respond with the access token
    setResponse({ accessToken: token }, res);
  } catch (err) {
    setError(err, res);
  }
};

export const getUser = async (req, res) => {
  try {
    // Get the accessToken from the request header
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization);
    const secretKey = process.env.JWT_SECRET;
    // console.log(accessToken);
    // Verify and decode the accessToken to get the userId
    const decodedToken = jwt.verify(accessToken, secretKey);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);
    // Get the user from the database using the userId
    const user = await getUserById(userId);

    setResponse(user, res);
  } catch (err) {
    setError(err, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get the accessToken from the request header
    const accessToken = req.headers.authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;
    // Verify and decode the accessToken to get the userId
    const decodedToken = jwt.verify(accessToken, secretKey);
    const userId = decodedToken.userId;
    // Get the user from the database using the userId
    const updatedUser = await updateUserService(userId, req.body);
    setResponse(updatedUser, res);
  } catch (err) {
    setError(err, res);
  }
};

export const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.password;

    console.log(`new password ${newPassword}`);
    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    console.log(`new hash password ${newHashedPassword}`);
    const updatedUser = await updateUserPassword(email, newHashedPassword);
    setResponse(updatedUser, res);

  } catch (err) {
    setError(err, res);
  }
}
