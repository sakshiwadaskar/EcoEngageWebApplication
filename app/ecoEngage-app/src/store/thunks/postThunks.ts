import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewPost, getPosts } from "../../services/posts-service";

export const createPostThunk = createAsyncThunk(
  'api/createPost',
  async (formData: FormData, thunkAPI) => { // Change parameter type to FormData
    try {
      const token = localStorage.getItem('token') || "";
      return await createNewPost(formData, token); // Pass formData to createNewPost
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);


export const getPostsThunk = createAsyncThunk(
  'api/getPosts',
  async () => {
    console.log("Get post thunk!");
    return await getPosts();
  }
);
