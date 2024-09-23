import { setResponse, setError } from './response-handler.js'
import * as postService from '../services/post-service.js'
import jwt from 'jsonwebtoken'
import * as commentCreationService from "../services/comment-creation-service.js";


export const newPost = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: newPost ______________________");

    // Get the authorization header from the request
    const authHeader = request.headers.authorization;

    // Check if the authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }

    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token and decode it to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const author = decodedToken.firstName;
    const authorId= decodedToken.userId;

    // Extract post data from request body
    const { title, content } = request.body;

    // const image = request.file ? `/uploads/${request.file.filename}` : null;
    const image = request.file ? `${process.env.BASE_URL}/uploads/${request.file.filename}` : null;


    // Create new post data including the author
    const newPostData = { title, content, author, image, authorId };

    console.log("image is........backend-------------------------------------------", image);

    console.log("Checking the TypeOf newPostData: ", typeof newPostData);
    console.log("Request body spreaded as newPostData: ", newPostData);

    // Add the new post to the database
    const newCreatedPost = await postService.addPost_DB(newPostData);

    console.log("New PostCard received from the Posts-Service after newCreatedPost: ", newCreatedPost);
    console.log("_______________________________________________________________________________________________________");

    // Send response with the newly created post
    setResponse(newCreatedPost, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method newPost: " + error);
    // Send error response in case of an error
    setError(error, response);
  }
}


/**
  * Updates a PostCard by its ID in the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const updatePostById = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: updatePostById ______________________");

    // Get the authorization header from the request
    const authHeader = request.headers.authorization;
    
    // Check if the authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    
    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify the token and decode it to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const loggedinUserId= decodedToken.userId;
    console.log("Logged in User: " + loggedinUserId);
    
    // Check if PostId exists in the request params
    if (!request.params.id) {
      throw new Error("PostCard ID is missing in the request parameters.");
    }    

    const id = request.params.id;
    
    const postauthorId = (await postService.getPostById_DB(id)).authorId;
    console.log("Post User : " + postauthorId);
    
    if(loggedinUserId != postauthorId){
      throw new Error("You do not have enough permissions to update this post");
    }
    
    console.log("Checking the TypeOf PostId: ", typeof id);
    console.log("Request params id as PostId: ", id);

    const data = request.body;
    console.log("Request body spreaded as data: ", data);

    const updatedPost = await postService.updatePost_DB(id, data)
    console.log("Recieved updated PostCard from the PostCard-Service after updatedPost: ", updatedPost);
    console.log("_______________________________________________________________________________________________________");

    setResponse(updatedPost, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method updatePostById: " + error);
    setError(error, response);
  }
}



/**
  * Deletes a PostCard by its ID from the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const deletePostById = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: deletePostById ______________________");

    const authHeader = request.headers.authorization;
    
    // Check if the authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    
    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify the token and decode it to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const loggedinUserId= decodedToken.userId;
    console.log("Logged in User: " + loggedinUserId);
    
    // Check if PostId exists in the request params
    if (!request.params.id) {
      throw new Error("PostCard ID is missing in the request parameters.");
    }

    const PostId = request.params.id;

    const postauthorId = (await postService.getPostById_DB(PostId)).authorId;
    console.log("Post User : " + postauthorId);
    
    if(loggedinUserId != postauthorId){
      throw new Error("You do not have enough permissions to delete this post");
    }
    
    console.log("Checking the TypeOf PostId: ", typeof PostId);
    console.log("Request params id as PostId: ", PostId);

    const deletedPost = await postService.deletePost_DB(PostId);
    console.log("Recieved deleted PostCard from the PostCard-Service after deletedPost: ", deletedPost);
    console.log("_______________________________________________________________________________________________________");

    setResponse(deletedPost, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method deletePostById: " + error);
    setError(error, response);
  }
}




/**
 * Retrieves posts from the database by the logged-in user's ID.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 */
export const getPostsByLoggedInUser = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: getPostsByLoggedInUser ______________________");

    const authHeader = request.headers.authorization;

    // Check if the authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }

    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token and decode it to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the logged-in user's ID from the request object (assuming it's stored in req.user)
    const loggedInUserId = decodedToken.userId;

    console.log("Logged-in user ID: ", loggedInUserId);

    // Fetch posts by the logged-in user's ID using the service layer function
    const posts = await postService.getPostsByLoggedInUser_DB(loggedinUserId);

    console.log("Posts retrieved by logged-in user: ", posts);
    console.log("_______________________________________________________________________________________________________");

    // Set response with the retrieved posts
    setResponse(posts, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method getPostsByLoggedInUser: " + error);
    // Set error response in case of an error
    setError(error, response);
  }
};



/**
 * Retrieves all posts from the database.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 */
export const getAllPosts = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: getAllPosts ______________________");

    // Fetch all posts using the service layer function
    const posts = await postService.fetchAllPosts_DB();

    console.log("All posts retrieved: ", posts);
    console.log("_______________________________________________________________________________________________________");

    // Set response with the retrieved posts
    setResponse(posts, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method getAllPosts: " + error);
    // Set error response in case of an error
    setError(error, response);
  }
};

export const commentOnPostById = async (req, res) => {
  try {

    const authHeader = req.headers.authorization;
    // Check if the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
          .status(401)
          .json({message: "Authorization header missing or invalid"});
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode the JWT token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return res.status(401).json({message: "Invalid token"});
    }

    const postId = req.params.id;
    const comment = {
      ...req.body,
      postId,
    };

    const newComment = await commentCreationService.createCommentForPost(comment);
    console.log("New Comment", newComment);


    const post = (await postService.getPostById_DB(postId));
    post.comments.push(newComment);
    console.log("Post", post);
    await postService.updatePost_DB(postId, post);

    setResponse(newComment, res);
  } catch (error) {
    console.log(error);
  }

}



  // Like a post functionality
/**
 * Toggle like functionality for a post.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
  export const toggleLikePost = async (request, response) => {
    try {
      // Get the authorization header from the request
      const authHeader = request.headers.authorization;
      console.log("token from backend service: " , authHeader)

      // Check if the authorization header is present and correctly formatted
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response
            .status(401)
            .json({message: "Authorization header missing or invalid"});
      }


      // Extract the token from the authorization header
      const token = authHeader.split(" ")[1];
      console.log("token from backend service: " , token)

      // Verify and decode the JWT token to get the user ID
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken.userId) {
        return response.status(401).json({message: "Invalid token"});
      }
      // Extract the user ID from the decoded token
      const userId = decodedToken.userId;

      // Extract the post ID from the request parameters
      const postId = request.params.id;


      const post = (await postService.getPostById_DB(postId));

      // Check if the post exists
      if (!post) {
        return response.status(404).send('Post not found');
      }
      // Find the index of the user's like in the post's likes array
      const likeIndex = post.likes.indexOf(userId);

      // Toggle like status based on whether the user has already liked the post
      if (likeIndex > -1) {
        // User already liked the post, remove like
        post.likes.splice(likeIndex, 1);
      } else {
        // User hasn't liked the post yet, add like
        post.likes.push(userId);
      }

      await post.save();
      response.status(200).json(post);
    } catch (error) {
      response.status(500).send(error.message);
    }

}
