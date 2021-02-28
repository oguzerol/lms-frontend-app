import useUserExams from "../../core/querys/useUserExams";
import Loading from "../Loading";
import { UserExams } from "../../core/types/exam";
import { Typography } from "@material-ui/core";

const UpcomingExamCard = () => {
  const { data, isLoading, error } = useUserExams();

  console.log(data, isLoading, error);
  if (isLoading) return <Loading />;
  if (data && data.length === 0)
    return (
      <>
        <Typography>
          Su ada satın aldıgınız bır sınav yok hemen sınav satın almak ıcın
          tıklayın
        </Typography>
      </>
    );
  return (
    <div>
      {error && <Typography>Bir hata oluştu.</Typography>}

      {data && data.map((exam: UserExams) => <div>{exam.exams.name}</div>)}
    </div>
  );
};

export default UpcomingExamCard;
