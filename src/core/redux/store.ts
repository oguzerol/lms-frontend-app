import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ME } from "../route/constants";

import authReducer, { authSlice } from "./slices/auth";
import examReducer from "./slices/exam";
import themeReducer from "./slices/theme";

const { REACT_APP_API_BASE } = process.env;

const checkAuth = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common.token = token;
      dispatch(authSlice.actions.authRequest());
      axios
        .get(`${REACT_APP_API_BASE}${API_ME}`)
        .then((res) => {
          dispatch(authSlice.actions.setAuth(res.data));
        })
        .catch(() => {
          localStorage.removeItem("token");
          axios.defaults.headers.common.token = null;
          dispatch(authSlice.actions.deleteAuth());
        });
    }
  };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    exam: examReducer,
  },
});

store.dispatch(checkAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
