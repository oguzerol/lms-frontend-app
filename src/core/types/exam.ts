// TODO: UPDATE
export type Exams = {
  id: number;
  name: string;
};

export type UserExams = {
  id: number;
  exam_id: number;
  user_id: number;
  standalone_start_time: null | Date;
  standalone_end_time: null | Date;
  standalone_status: null | number;
  created_at: null | Date;
  updated_at: null | Date;
  deleted_at: null | Date;
  info: Exams;
};

export type Answer = {
  label: String;
  question_id: number;
  id: number;
  answer_id: number;
  content: String;
};

export type UserAnswer = {
  answer_id?: number;
};

export type QuestionType = {
  id: number;
  info: String;
  content: String;
  answers: Array<Answer>;
  user_answers: UserAnswer;
};

export type ExamType = {
  description: String;
  name: String;
  user_exams: UserExams;
  questions: Array<QuestionType>;
};

export type CurrentQuestionAnswer = {
  id: number;
  answer_id: number;
  content: String;
};
