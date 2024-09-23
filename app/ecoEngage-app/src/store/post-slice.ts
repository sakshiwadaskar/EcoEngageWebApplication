import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../models/Post";
import { AppState } from ".";
import { createPostThunk, getPostsThunk } from "./thunks/postThunks";
import { createCommentThunk } from "./thunks/commentThunks";



export type PostState = Post[];

const initiateState: PostState = [];

export const postSlice = createSlice({
  name: 'posts',
  initialState: initiateState,
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        if (action.payload) {
          // Clear the existing state and replace it with the new posts
          state.splice(0, state.length, ...action.payload);
        }
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        const createdComment = action.payload
        const postId = createdComment?.postId;
        const postIndex = state.findIndex(post => post.id === postId);
        if (postIndex !== -1 && createdComment) {
          state[postIndex].comments?.push(createdComment); // Using optional chaining
        }

      });

  },
  reducers: {
    loadPosts: (_state: PostState, action: PayloadAction<PostState>) => {
      return [...action.payload];
    },
  }
});

//Actions
export const { loadPosts } = postSlice.actions;

//Selectors
export const getAllPosts = (): ((state: AppState) => PostState) => {
  return (state: AppState) => {
    return state.posts
  };
}

export const findPostById = (id: string): ((state: AppState) => Post | undefined) => {
  return (state: AppState) => state.posts.find(post => post.id === id);
}

//Reducers
export default postSlice.reducer;