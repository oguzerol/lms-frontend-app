import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const SET_AUTH = "SET_AUTH";
export const DELETE_AUTH = "DELETE_AUTH";

export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    deleteAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
