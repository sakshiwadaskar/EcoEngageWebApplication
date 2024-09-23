/**
 * Module for handling operations related to comment creations.
 * @module CommentCreationController
 */
import { setError, setResponse } from "../controllers/response-handler.js";
import CommentCreation from "../model/comment.js";
import mongoose from "mongoose";

/**
 * Get all comments.
 * @param {Object} query - The query object for filtering comments.
 * @returns {Promise<Array>} A promise that resolves to an array of comments.
 */
export const getAllComments = async (query) => {
  const comments = await CommentCreation.find(query).exec();
  return comments;
};
/**
 * Save a new comment.
 * @async
 * @param {Object} creation - The comment creation object to be saved.
 * @returns {Promise<Object>} A promise that resolves to the saved comment object.
 */
export const postComment = async (creation) => {
  const commentCreation = new CommentCreation(creation);
  return commentCreation.save();
};

/**
 * Find a CommentCard by its ID.
 * @async
 * @param {string} id - The ID of the CommentCard to find.
 * @returns {Promise<Object|null>} A promise that resolves to the found CommentCard object, or null if not found.
 */
export const findCommentById = async (id) => {
  const commentCreation = await CommentCreation.findById(id).exec();
  return commentCreation;
};

export const findCommentsByPost = async (postId) => {
  try {
    // CommentCard model has a postId field that references the Post model
    console.log("Displaying all the comments associate with the id:", postId);
    const comments = await CommentCreation.find({ postId });
    return comments;
  } catch (error) {
    console.error("Error finding comments by post:", error);
    throw error;
  }
};

export const createCommentForPost = async (commentData) => {
  try {
    console.log("Comment from backend service:", commentData);
    const newComment = new CommentCreation(commentData);
    await newComment.save();
    console.log("new comment", newComment);
    return newComment;
  } catch (error) {
    console.error("Error creating comment for post:", error);
    throw error;
  }
};

/**
 * Update a CommentCard.
 * @param {string} id - The ID of the CommentCard to update.
 * @param {Object} updateData - The updated data for the CommentCard.
 * @returns {Promise<Object>} A promise that resolves to the updated CommentCard object.
 */
export const updateComment = async (id, updateData) => {
  // First, find the comment to ensure it exists and to get the authorId
  const updatedComment = await CommentCreation.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).exec();
  return updatedComment;
};

/**
 * Delete a MeetingNote.
 * @returns {Promise<void>} A promise that resolves when the MeetingNote is deleted successfully.
 * @param commentId
 * @param authorId
 */
export const deleteComment = async (commentId, authorId) => {
  try {
    // If authorized, delete the comment
    await CommentCreation.findByIdAndDelete(commentId);

    // Optionally, you could return some information, but for deletion, a success message is often enough
    return { message: "CommentCard successfully deleted" };
  } catch (error) {
    // You could throw the error to be handled by the caller
    // Or handle it here as per your application's error handling strategy
    console.error("Error deleting comment:", error);
    throw error;
  }
};
/**
 * Check if the user is the author of the comment.
 *
 * @param {string} commentId - The ID of the comment to check.
 * @param {string} userId - The ID of the user to compare with the comment's author ID.
 * @returns {boolean} - A boolean value indicating whether the user is the author of the comment.
 */
export const checkCommentAuthor = async (commentId, userId) => {
  try {
    // Assuming you have a CommentCard model with a find method
    const comment = await CommentCreation.findById(commentId);

    if (!comment) {
      console.error("CommentCard not found");
      return false;
    }

    // Assuming the comment document has a userId or authorId field
    return userId.toString() === comment.authorId;
  } catch (error) {
    console.error("Error checking comment author:", error);
    return false;
  }
};

/**
 * Check if the user is the author of the post.
 *
 * @param {string} postOwnerId - The ID of the user who owns the post.
 * @param {string} userId - The ID of the user to compare with the post owner's ID.
 * @returns {boolean} - A boolean value indicating whether the user is the author of the post.
 */
export const checkPostAuthor = async (postOwnerId, userId) => {
  // Compare the user ID with the post owner's ID
  return postOwnerId.toString() === userId.toString();
}
