import express from "express"
import * as commentController from "../controllers/comments-controller.js"

const router = express.Router();

/**
 * Defines routes for interacting with notes.
 */
/**
 * Base route for comments, allowing for the creation of a new comment
 * and fetching all comments (you might want to restrict or paginate this in a real application).
 */
router.route('/')
    .get(commentController.searchAllComments) // GET request to get all comments.
    .post(commentController.addComment); // POST request to create a new comment.

/**
 * Routes specific to comments associated with a post.
 * '/post/:postId/comments' can be used to list or add comments to a specific post.
 */
router.route('/post/:postId/')
    .get(commentController.searchCommentsByPost) // GET request to retrieve all comments for a specific post.
    .post(commentController.addCommentToPost); // POST request to add a new comment to a specific post.

/**
 * Routes for operations on a specific comment by ID. This could include getting, updating, and deleting a comment.
 * Note: You might want to ensure the operation is only performed if the comment belongs to the specified post.
 */
router.route('/:id')
    .get(commentController.searchCommentById) // GET request to retrieve a specific comment by ID.
    .delete(commentController.removeComment) // DELETE request to delete a specific comment by ID.
    .patch(commentController.updateComment); // PATCH request to update a specific comment by ID.

export default router;