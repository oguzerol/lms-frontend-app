// import React from 'react';

import { useEffect } from "react";
import { useHistory } from "react-router";

import { useSocket } from "../../core/contexts/socket";
import { URL_MY_EXAMS } from "../../core/route/constants";
import { toastLocalDebug } from "../../core/utils/toaster";

const Exam = () => {
  const socket = useSocket();
  const history = useHistory();

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
