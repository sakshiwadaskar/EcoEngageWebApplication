import { User } from "../models/User";
export const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

//export const BASE_URL = "http://localhost:5001";
// This file contains the implementation of the AuthService module.
// It provides functions for user authentication and user data management.
// The AuthService module.
export const AuthService = {
  // Function for user sign up.
  // Parameters:
  // - firstName: The user's first name.
  // - lastName: The user's last name.
  // - email: The user's email address.
  // - password: The user's password.
  // Returns: The access token for the signed up user.
  async signUp(firstName: String, lastName: String, email: String, password: String) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  // Function for user sign in.
  // Parameters:
  // - email: The user's email address.
  // - password: The user's password.
  // Returns: The access token for the signed in user.
  async signIn(email: String, password: String) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  // Function for getting user data.
  // Returns: The user data.
  async getUser() {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Function for updating user data.
  // Parameters:
  // - user: The updated user data.
  // Returns: The updated user data.
  async updateUser(user: User) {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },

  // Function for changing user password.
  // Parameters:
  // - email: The user's email address.
  // - password: The new password.
  // Returns: The response data.
  async changePassword(email: string, password: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/forgotPassword/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
};
