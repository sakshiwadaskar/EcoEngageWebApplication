// store/commentSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../models/Comment";
import { AppState } from ".";


export type CommentState = Comment[];

const initialState: CommentState = [];

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    loadComments: (_state: CommentState, action: PayloadAction<CommentState>) => {
      return [...action.payload];
    },
    addComment: (state: CommentState, action: PayloadAction<Comment>) => {
      state.push(action.payload);
    },
    updateComment: (state: CommentState, action: PayloadAction<Comment>) => {
      const index = state.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteComment: (state: CommentState, action: PayloadAction<string>) => {
      const index = state.findIndex(comment => comment.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  }
});

// Actions
export const { loadComments, deleteComment, updateComment, addComment } = commentSlice.actions;

// Selectors
export const getAllComments = (): (state: AppState) => CommentState => {
  return (state: AppState) => {
    return state.comments
  };
}

export const getCommentsByPostId = (postId: string) => (state: AppState): Comment[] => {
  return state.comments.filter(comment => comment.postId === postId);
}

export const findCommentById = (id: string) => (state: AppState): Comment | undefined => {
  return state.comments.find(comment => comment.id === id);
}

// Reducer
export default commentSlice.reducer;
