import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../models/User';
import { AppState } from ".";

export const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser: (_state: User | null, action: PayloadAction<User>) => {
      console.log("Setting user in state");
      console.log(action.payload);
      return action.payload;
    },
    clearUser: (_state: User | null) => {
      return null;
    },
  }
});

// Actions
export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const getUser = (state: AppState) => {
  return state.user;
};

// Reducer
export default userSlice.reducer;
