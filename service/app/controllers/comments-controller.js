import * as commentCreationService from "../services/comment-creation-service.js"
import { setResponse, setError } from "./response-handler.js";
import jwt from "jsonwebtoken";
import { log } from "debug";
import * as postService from "../services/post-service.js";

/**
 * Search for all comments.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
export const searchAllComments = async (request, response) => {
  try {
    // Retrieve all comments
    const comments = await commentCreationService.getAllComments();
    // Set response with the retrieved comments
    setResponse(comments, response);
  } catch (error) {
    // Handle errors
    setError(error, response);
  }
};

/**
 * Search for comments by post ID.
 *
 * @param {Object} request - The HTTP request object containing the post ID.
 * @param {Object} response - The HTTP response object.
 */

export const searchCommentsByPost = async (request, response) => {
  console.log(
    "_________________________ WE ARE IN THE CONTROLLER METHOD: Search CommentCard by the post id ______________________"
  );
  try {
    // Extract the post ID from the request parameters
    const postId = request.params.postId;
    // Find comments associated with the given post ID
    const comments = await commentCreationService.findCommentsByPost(postId);
    // Set response with the retrieved comments
    setResponse(comments, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Add a new comment to a post.
 *
 * @param {Object} req - The HTTP request object containing the comment data and authorization token.
 * @param {Object} res - The HTTP response object.
 */
export const addCommentToPost = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    // Check if the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode the JWT token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Create a new comment object with the provided data and the associated post ID
    const postId = req.params.postId;
    console.log(postId);
    const comment = {
      ...req.body,
      postId,
    };
    // Create the new comment and retrieve the created comment object
    const newComment = await commentCreationService.createCommentForPost(
      comment
    );
    console.log("New Comment", newComment);

    // Retrieve the post by its ID from the database
    const post = await postService.getPostById_DB(postId);

    // Add the new comment to the comments array of the retrieved post
    post.comments.push(newComment);
    console.log("Post", post);

    // Update the post in the database with the new comment
    await postService.updatePost_DB(postId, post);

    // Set response with the created comment object
    setResponse(newComment, res);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Search for a comment by its ID.
 *
 * @param {Object} request - The HTTP request object containing the comment ID.
 * @param {Object} response - The HTTP response object.
 */

export const searchCommentById = async (request, response) => {
  try {
    const comment = await commentCreationService.findCommentById(
      request.params.id
    );
    setResponse(comment, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Add a new comment.
 *
 * @param {Object} request - The HTTP request object containing the new comment data.
 * @param {Object} response - The HTTP response object.
 */
export const addComment = async (request, response) => {
  try {
    const newComment = await commentCreationService.postComment(request.body);
    setResponse(newComment, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Update a comment.
 *
 * @param {Object} request - The HTTP request object containing the updated comment data.
 * @param {Object} response - The HTTP response object.
 */

export const updateComment = async (request, response) => {
  try {
    // Extract the comment ID from the request parameters
    const commentId = request.params.id;

    // Get the authorization header from the request
    const authHeader = request.headers.authorization;
    console.log("comment auth herader: ", authHeader);

    // Check if the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode the JWT token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return response.status(401).json({ message: "Invalid token" });
    }
    const userId = decodedToken.userId;

    // Check if the user is the author of the comment
    const isAuthor = await commentCreationService.checkCommentAuthor(
      commentId,
      userId
    );
    if (!isAuthor) {
      return response
        .status(403)
        .json({ message: "User not authorized to update this comment" });
    }

    /// Update the comment with the new data
    const updates = { ...request.body };
    console.log("updates", updates);

    // Find the comment by its ID using the comment service
    const commentToUpdate = await commentCreationService.findCommentById(
      commentId
    );

    // Get the post containing the comment
    const postId = commentToUpdate.postId;
    const post = await postService.getPostById_DB(postId);

    // Find the comment in the post's comments array
    const commentToUpdateInPost = post.comments.find(
      (obj) => obj._id.toString() === commentToUpdate._id.toString()
    );

    // Update the comment content in the post
    if (commentToUpdateInPost) {
      // Update the value of the key
      commentToUpdateInPost.commentContent = updates.commentContent;
    }
    // Update the post in the database
    await postService.updatePost_DB(postId, post);

    // Update the comment in the database
    const updatedComment = await commentCreationService.updateComment(
      commentId,
      updates
    );
    setResponse(updatedComment, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Remove a comment.
 *
 * @param {Object} request - The HTTP request object containing the comment ID.
 * @param {Object} response - The HTTP response object.
 */
export const removeComment = async (request, response) => {
  try {
    // Authorization check here
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    // Extract the comment ID from the request parameters
    const commentId = request.params.id;
    // Find the comment to delete by its ID
    const commentToDelete = await commentCreationService.findCommentById(
      commentId
    );

    const postId = commentToDelete.postId;
    // Get the post containing the comment
    const post = await postService.getPostById_DB(postId);

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is the author of the comment or the post
    const isCommentAuthor = await commentCreationService.checkCommentAuthor(commentId, decodedToken.userId);
    const isPostAuthor = await commentCreationService.checkPostAuthor(post.authorId, decodedToken.userId);
    const isAuthorized = isCommentAuthor || isPostAuthor

    if (!isAuthorized) {
      return response
        .status(403)
        .json({ message: "Not authorized to delete this comment", post: post.authorId, user: decodedToken.userId });
    }

    // Remove the comment from the post's comments array
    post.comments = post.comments.filter(({ _id }) => _id != commentId);

    // Update the post in the database
    await postService.updatePost_DB(postId, post);

    // Delete the comment from the database
    await commentCreationService.deleteComment(commentId, decodedToken.userId);

    // Set response indicating successful deletion
    setResponse({ message: "CommentCard deleted successfully" }, response);
  } catch (error) {
    setError(error, response);
  }
};