// import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  selectExam,
  setExam,
  examRequest,
  deleteExam,
} from "../../core/redux/slices/exam";

import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Paper, makeStyles } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Bookmark from "@material-ui/icons/Bookmark";

import { useSocket } from "../../core/contexts/socket";
import { API_USER_EXAMS } from "../../core/route/constants";
import { toastLocalDebug } from "../../core/utils/toaster";
import axios from "axios";
import QuestionNumber from "../../components/QuestionNumber";
import QuestionNav from "../../components/QuestionNav";
import Question from "../../components/Question";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      display: "flex",
      padding: "50px 0",
      height: "100%",
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
  };
});

const Exam = () => {
  const dispatch = useDispatch();
  const exam = useSelector(selectExam);

  const socket = useSocket();
  const history = useHistory();
  const classes = useStyles();
  const { examId }: { examId?: String } = useParams();

  useEffect(() => {
    dispatch(examRequest());
    axios
      .get(`${API_USER_EXAMS}/${examId}`)
      .then((res) => {
        toastLocalDebug("Sınav başarılı bir şekilde geldi.");
        dispatch(setExam(res.data[0]));
      })
      .catch((err) => {
        dispatch(deleteExam());
        toastLocalDebug(
          `Sınav getirilirken bir hata ile karşılaşıldı. ${err.response.data.stack}`
        );
      });
  }, [examId, dispatch]);

  console.log(exam);

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
  }, [socket, history]);

  const isQuestionMarked = 1;
  const currentQuestionIndex = 1;

  const handleQuestionChange = () => {
    console.log("yeee");
  };
  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.left}>
        <QuestionNumber currentQuestionIndex={currentQuestionIndex} />
        <QuestionNav
          currentQuestionIndex={currentQuestionIndex}
          changeCurrentQuestion={handleQuestionChange}
        />
      </div>
      <div className={classes.middle}>
        <Question
          currentQuestionInfo="info"
          currentQuestionAnswers={[]}
          currentQuestionIndex={currentQuestionIndex}
          currentQuestionId={1}
          changeAnswer={handleQuestionChange}
          userAnswers={[]}
          currentQuestionSubject="Subject"
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
  );
};

export default Exam;
