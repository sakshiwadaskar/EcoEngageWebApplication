import User from "../model/user.js";
// This is the authentication service module


/**
 * Creates a new user in the database.
 * @param {Object} userData - The user data.
 * @returns {Promise<User>} - The newly created user.
 * @throws {Error} - If there is an error creating the user.
 */
export const createUser = async (userData) => {
    try {
        console.log(userData);
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


/**
 * Retrieves a user from the database by email.
 * @param {string} email - The email of the user.
 * @returns {Promise<User>} - The user with the specified email.
 * @throws {Error} - If there is an error retrieving the user.
 */
export const getUserByEmail = async (email) => {

    try {
        return await User.findOne({ email });
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a user from the database by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<User>} - The user with the specified ID.
 * @throws {Error} - If the user is not found.
 */

export const getUserById = async (userId) => {
    const user = await User.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

/**

 * Updates a user in the database.
 * @param {string} userId - The ID of the user to update.
 * @param {Object} updateData - The data to update the user with.
 * @returns {Promise<User>} - The updated user.
 * @throws {Error} - If the user is not found.
 */
export const updateUserService = async (userId, updateData) => {

    const user = await User.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }
    const updatedUser = await User.findOneAndUpdate({ userId }, updateData, { new: true });
    return updatedUser;
};

/**
 * Updates a user's password in the database.
 * @param {string} email - The email of the user.
 * @param {string} newPassword - The new password.
 * @returns {Promise<User>} - The updated user.
 * @throws {Error} - If there is an error updating the user's password.
 */
export const updateUserPassword = async (email, newPassword) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ email }, { $set: { password: newPassword } }, { new: true });
        return updatedUser;
    } catch (err) {
        throw err;
    }
}