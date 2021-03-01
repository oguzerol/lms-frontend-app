import axios from "axios";
import { useQuery } from "react-query";
import { API_USER_EXAMS } from "../route/constants";

const useUserExams = (type?: string) =>
  useQuery(
    `userExams${type ? `_${type}` : ""}`,
    () =>
      axios
        .get(`${API_USER_EXAMS}${type ? `?type=${type}` : ""}`)
        .then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

export default useUserExams;
