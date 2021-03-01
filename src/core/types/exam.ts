// TODO: UPDATE
export type Exams = {
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
