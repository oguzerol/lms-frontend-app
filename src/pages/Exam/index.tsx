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

import { useSocket } from "../../core/contexts/socket";
import { API_USER_EXAMS } from "../../core/route/constants";
import { toastLocalDebug } from "../../core/utils/toaster";
import axios from "axios";

const Exam = () => {
  const dispatch = useDispatch();
  const exam = useSelector(selectExam);

  const socket = useSocket();
  const history = useHistory();
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

  return <div>exam content</div>;
};

export default Exam;
