import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCommentForPost, deleteCommentById } from "../../services/comments-service";

export const createCommentThunk = createAsyncThunk(
  'api/createComment',
  async (payload: any, thunkAPI) => {
    try {
      const postId = payload[0];
      const comment = payload[1];
      return await createCommentForPost(postId, comment);

    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  });

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: any, { rejectWithValue }) => {
    try {
      await deleteCommentById(commentId);
      return commentId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
