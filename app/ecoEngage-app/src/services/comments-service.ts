import axios from "axios";
import { Comment } from '../models/Comment';
import { getData } from "./api-service.ts";

const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

// const API_URL = 'http://localhost:5001/comments';
const commentsAPI = 'comments';

// Retrieves the authorization token
const getToken = () => {
  return localStorage.getItem('token');
}

/**
 * Retrieves all comments for a specific post.
 */
export const getCommentsByPost = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(`${API_URL}/comments/post/${postId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments for post:', error);
    throw error;
  }
};

/**
 * Retrieves Comments from the API.
 * @async
 * @function getComments
 * @param {object} [params={}] - Additional parameters for the request.
 * @returns {Promise<Comment[]>} A promise that resolves to an array of Posts.
 */

export const getComments = async (params = {}): Promise<Comment[]> => {
  return await getData(commentsAPI, params);
}

/**
 * Creates a new comment associated with a specific post.
 */
export const createCommentForPost = async (postId: string, comment: Comment): Promise<Comment | null> => {
  const token = getToken();
  try {
    console.log("comment from comments-service.ts", comment);
    console.log("postid", postId);
    const response = await axios.post<Comment>(`${API_URL}/commentsAPI/post/${postId}`, comment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating a new comment:", error);
    throw error;
  }
};



/**
 * Updates an existing comment.
 */
export const updateCommentById = async (commentId: string, commentUpdate: {}): Promise<Comment | null> => {

  const token = getToken();
  try {
    console.log("CommentCOntent", commentUpdate)
    const response = await axios.patch<Comment>(`${API_URL}/commentsAPI/${commentId}`, commentUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

/**
 * Deletes a comment.
 */
export const deleteCommentById = async (commentId: string): Promise<void> => {
  const token = getToken();
  try {
    await axios.delete(`${API_URL}/commentsAPI/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
