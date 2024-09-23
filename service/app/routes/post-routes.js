import express from "express";
import * as postController from '../controllers/post-controller.js';
import {get} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

const postRouter = express.Router();
//handling image uploads.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using UUID
        const uniqueFilename = uuidv4();
        // Extract the file extension from the original filename
        const ext = file.originalname.split('.').pop();
        // Create the sanitized filename with the original extension
        const sanitizedFilename = `${uniqueFilename}.${ext}`;
        cb(null, sanitizedFilename);
    }
});
const upload = multer({ storage: storage });

// Route for creating a new post and adding an image attachment.
postRouter.route('/')
    .post(upload.single('image'), postController.newPost)
    .get(postController.getAllPosts);

// Route for updating and deleting a post by ID
postRouter.route('/:id')
    .patch(postController.updatePostById)
    .delete(postController.deletePostById);

// Route for fetching posts by the logged-in user
postRouter.route('/user')
    .get(postController.getPostsByLoggedInUser);

/**
 * Express route for toggling like on a post.
 *
 * @method PATCH
 * @param {string} '/:id/toggle-like' - The route path for toggling like on a post.
 * @param {Function} postController.toggleLikePost - The controller method for toggling like on a post.
 */
postRouter.route('/:id/toggle-like')
    .patch(postController.toggleLikePost);


export default postRouter;

