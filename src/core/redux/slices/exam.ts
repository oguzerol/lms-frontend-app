import { UserExams } from "./../../types/exam";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Question = {
  info: String;
  content: String;
};

type Exam = {
  user_exams: UserExams;
  questions: Array<Question>;
};

type ExamState = {
  exam: Exam | null;
  isLoading: boolean;
};

const initialState: ExamState = {
  exam: null,
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

export const { setExam, deleteExam, examRequest } = examSlice.actions;

export const selectExam = (state: RootState) => state.exam.exam;
export const selectEndTime = (state: RootState) =>
  state.exam.exam?.user_exams.standalone_end_time;

export default examSlice.reducer;
