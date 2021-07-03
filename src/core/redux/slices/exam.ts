import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: number;
  email: string;
  username: string;
};

export type ExamState = {
  user: null | User;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: ExamState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    examRequest: (state) => {
      state.isLoading = true;
    },
    setExam: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    deleteExam: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setExam, deleteExam } = examSlice.actions;

export const selectExam = (state: RootState) => state.exam;

export default examSlice.reducer;
