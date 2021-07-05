import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { Paper, makeStyles, Grid } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Bookmark from "@material-ui/icons/Bookmark";

import { useSocket } from "../../core/contexts/socket";
import { toastLocalDebug } from "../../core/utils/toaster";
import QuestionNumber from "../../components/QuestionNumber";
import QuestionNav from "../../components/QuestionNav";
import Question from "../../components/Question";
import QuickView from "../../components/QuickView";
import useUserExam from "../../core/querys/useUserExam";
import { UserExams } from "../../core/types/exam";

type Answer = {
  label: String;
  question_id: number;
  id: number;
  answer_id: number;
  content: String;
};

export type UserAnswer = {
  answer_id?: number;
};

type QuestionType = {
  id: number;
  info: String;
  content: String;
  answers: Array<Answer>;
  user_answers: UserAnswer;
};

type ExamType = {
  user_exams: UserExams;
  questions: Array<QuestionType>;
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      height: "100%",
      justifyContent: "center",
      display: "flex",
      padding: "20px 0",
      overflow: "hidden",
      margin: 0,
    },
    paper: {
      width: "100%",
      display: "flex",
      padding: "50px 0",
      height: "100%",
      overflowY: "auto",
      // TODO: windows custom scrollbar
    },
    left: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      flexBasis: "64px",
    },
    right: {
      display: "flex",
      alignItems: "center",
      flexBasis: "64px",
      position: "relative",
    },
    middle: {
      flexGrow: 1,
    },
    bookmark: {
      position: "absolute",
      top: 0,
      right: "15px",
    },
    container: {
      display: "flex",
      height: "100%",
    },
  };
});

const Exam = () => {
  const socket = useSocket();
  const classes = useStyles();
  const { examId }: { examId?: String } = useParams();

  const {
    data,
    isLoading,
    error,
  }: { data?: Array<ExamType>; isLoading: any; error: any } =
    useUserExam(examId);
  const exam = data && data[0];

  console.log(isLoading, error);

  const [state, setState] = useReducer(
    (currentState: {}, newState: { currentQuestionIndex: number }) => ({
      ...currentState,
      ...newState,
    }),
    {
      currentQuestionIndex: 0,
    }
  );

  useEffect(() => {
    if (socket == null) return;

    toastLocalDebug("Socket bağlantısı kuruldu.");

    socket.on("end-exam", () => {
      toastLocalDebug("Socket'ten sınavı bitirme isteği geldi.");
      // TODO: Find better place
      // dispatch(deleteExam());
      // history.push(URL_MY_EXAMS);
    });

    return () => {
      socket.off("end-exam");
      toastLocalDebug("Socket bağlantısı kapatıldı.");
    };
  }, [socket]);

  const isQuestionMarked = 1;

  const handleQuestionChange = (id: number) => {
    setState({ currentQuestionIndex: id });
  };

  const handleChangeAnswer = ({
    questionId,
    answerId,
  }: {
    questionId: number;
    answerId: number;
  }) => {};

  const { currentQuestionIndex } = state;

  const currentQuestionInfo = exam?.questions[currentQuestionIndex].info;
  const currentQuestionContent = exam?.questions[currentQuestionIndex].content;
  const currentQuestionAnswers = exam?.questions[currentQuestionIndex].answers;
  const currentQuestionId = exam?.questions[currentQuestionIndex].id;
  const currentQuestionUserAnswer =
    exam?.questions[currentQuestionIndex].user_answers?.answer_id;

  const questionsWithAnswer = exam?.questions.map((question) => {
    return {
      question_id: question.id,
      isSelected: !!question.user_answers?.answer_id,
    };
  });

  if (error) {
    return <div>{error.response.data.message}</div>;
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item sm={12} md={9} xl={10} className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.left}>
            <QuestionNumber currentQuestionIndex={currentQuestionIndex} />
            <QuestionNav
              currentQuestionIndex={currentQuestionIndex}
              changeCurrentQuestion={handleQuestionChange}
            />
          </div>
          <div className={classes.middle}>
            <Question
              currentQuestionInfo={currentQuestionInfo}
              currentQuestionAnswers={currentQuestionAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentQuestionId={currentQuestionId}
              currentQuestionContent={currentQuestionContent}
              changeAnswer={handleChangeAnswer}
              userAnswer={currentQuestionUserAnswer}
            />
          </div>
          <div className={classes.right}>
            <div className={classes.bookmark}>
              {!isQuestionMarked ? (
                <Bookmark fontSize="large" />
              ) : (
                <BookmarkBorderIcon fontSize="large" />
              )}
            </div>
            <QuestionNav
              next
              currentQuestionIndex={currentQuestionIndex}
              changeCurrentQuestion={handleQuestionChange}
            />
          </div>
        </Paper>
      </Grid>
      <Grid item sm={12} md={3} xl={2}>
        <QuickView
          list={questionsWithAnswer}
          changeCurrentQuestion={handleQuestionChange}
          questionsLength={80}
        />
      </Grid>
    </Grid>
  );
};

export default Exam;
