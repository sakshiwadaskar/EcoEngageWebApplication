import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./event-slice";
import userReducer from "./user-slice";
import {postSlice} from "./post-slice.ts";
import {commentSlice} from "./comment-slice.ts";

export const store = configureStore({
  reducer: {
    'user': userReducer,
    [eventSlice.name]: eventSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [commentSlice.name]: commentSlice.reducer
  }
});



export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
