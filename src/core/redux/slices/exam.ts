import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ExamState = {
  exam: null | Object;
  isLoading: boolean;
};

const initialState: ExamState = {
  exam: false,
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
      state.exam = action.payload;
      state.isLoading = false;
    },
    deleteExam: (state) => {
      state.exam = null;
      state.isLoading = false;
    },
  },
});

export const { setExam, deleteExam } = examSlice.actions;

export const selectExam = (state: RootState) => state.exam;

export default examSlice.reducer;
