/**
 * Module for handling CRUD operations for Posts.
 * @module PostService
 */

import { Post } from '../models/Post.ts';
import { getData } from './api-service';
import axios from "axios";
// const API_URL = 'http://localhost:5001/posts';
const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
/**
 * Endpoint for posts in the API.
 * @constant
 * @type {string}
 */
const postsAPI = 'posts';

/**
 * Retrieves Post from the API.
 * @async
 * @function getPosts
 * @param {object} [params={}] - Additional parameters for the request.
 * @returns {Promise<Post[]>} A promise that resolves to an array of Posts.
 */

export const getPosts = async (params = {}): Promise<Post[]> => {
  return await getData(postsAPI, params);
}
/**
 * Updates a event in the API.
 * @async
 * @function updatePost
 * @param {string} postId - The ID of the Post to update.
 * @param {Post} updatedPost - The updated Post object.
 * @returns {Promise<Post | null>} A promise that resolves to the updated Post or null if an error occurs.
 */

export const updatePost = async (postId: string | undefined, updatedPost: {
  title: string;
  content: string
}, token: string): Promise<Post | null> => {
  try {
    const response = await axios.patch<Post>(`${API_URL}/posts/${postId}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:');
    throw error;
  }
};


/**
 * Creates a new Post in the API.
 * @async
 * @function newPost
 * @param {Post} newCreatedPost - The new Post object to create.
 * @returns {Promise<Post | null>} A promise that resolves to the created Post or null if an error occurs.
 */

// Function to create a new post
export async function createNewPost(postData: FormData, token: string): Promise<Post | null> {
  try {
    const response = await axios.post<Post>(`${API_URL}/posts/`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log("Image url is:..................", response.headers);
    console.log("post data is.......", response);
    return response.data;
  } catch (error) {
    console.error("Error creating a new post:", error);
    return null;
  }
}


// Function to delete an existing post
/**
 * Deletes a Post from the API.
 * @async
 * @function deletePost
 * @param {string} postId - The ID of the Post to delete.
 * @returns {Promise<Post | null>} A promise that resolves to the deleted Post or null if an error occurs.
 */
export const deletePost = async (postId: string, token: string): Promise<void> => {
  try {
    // Make a DELETE request to the API endpoint with the postId
    // Include the Authorization header with the provided token
    await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Post with ID: ${postId} has been successfully deleted.`);
  } catch (error) {
    console.error('Error deleting post, you are not authorized to delete the post!', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


// Function to toggle  like/unlike to a post
/**
 * like/Unlikes a Post from the API.
 * @async
 * @function toggleLikeUnlike
 * @param {string} postId - The ID of the Post to delete.
 * @returns {Promise<void>} A promise that resolves to the like/unlike on the Post or null if an error occurs.
 */

export const toggleLikeUnlike = async (postId: string, token: string): Promise<void> => {
  console.log('token from the service frontend.......', token);
  try {
    const response = await axios.patch(`${API_URL}/posts/${postId}/toggle-like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("toggle like unlike in fronendd service:.......");
    return response.data;
  } catch (error) {
    console.log('token from the service frontend.......', token);
    console.error('Error in liking/unliking post, you are not authorized.')
  }
}
