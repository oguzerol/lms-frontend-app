import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./pages/App";
import reportWebVitals from "./core/reportWebVitals";
import configAxios from "./core/config/axios-config";
import theme from "./core/theme";
import CssBaseline from "@material-ui/core/CssBaseline";

configAxios(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme("dark")}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
