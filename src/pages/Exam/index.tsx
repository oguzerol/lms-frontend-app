// import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectExam, setExam } from "../../core/redux/slices/exam";

import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

import { useSocket } from "../../core/contexts/socket";
import { API_USER_EXAMS, URL_MY_EXAMS } from "../../core/route/constants";
import { toastLocalDebug } from "../../core/utils/toaster";
import axios from "axios";

const Exam = () => {
  const socket = useSocket();
  const history = useHistory();
  const { examId }: { examId?: String } = useParams();

  useEffect(() => {
    console.log(examId);
    axios
      .get(`${API_USER_EXAMS}/${examId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [examId]);

  useEffect(() => {
    if (socket == null) return;

    toastLocalDebug("Socket bağlantısı kuruldu.");

    socket.on("end-exam", () => {
      toastLocalDebug("Socket'ten sınavı bitirme isteği geldi.");
      // TODO: Find better place
      history.push(URL_MY_EXAMS);
    });

    return () => {
      socket.off("end-exam");
      toastLocalDebug("Socket bağlantısı kapatıldı.");
    };
  }, [socket, history]);

  return <div>exam content</div>;
};

export default Exam;
