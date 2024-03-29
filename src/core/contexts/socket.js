import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth";

const { REACT_APP_SOCKET_URL } = process.env;

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    let newSocket = "";
    if (user) {
      newSocket = io(REACT_APP_SOCKET_URL, {
        auth: {
          userId: user.id,
        },
      });
      setSocket(newSocket);
    }

    return () => user && newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
