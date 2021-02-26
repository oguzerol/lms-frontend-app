import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { authSlice } from "./auth";
import authReducer from "./auth";
import { API_ME } from "../route/constants";

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
  },
});

store.dispatch(checkAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
