import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Toaster } from "react-hot-toast";

import AppLayout from "./layouts/AppLayout";
import getTheme from "../core/theme";
import AppRoute from "./route/AppRoute";
import {
  URL_DASHBOARD,
  URL_EXAM,
  URL_LOGIN,
  URL_MY_EXAMS,
} from "./route/constants";
import { selectTheme } from "./redux/slices/theme";
import { SocketProvider } from "./contexts/socket";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MyExams from "../pages/MyExams";
import Exam from "../pages/Exam";

import "../assets/fonts.css";
import ExamLayout from "./layouts/ExamLayout";

const queryClient = new QueryClient();

const Root = () => {
  const theme = useSelector(selectTheme);
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <Toaster position="bottom-right" reverseOrder={false} />
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <AppRoute
                exact
                path={URL_DASHBOARD}
                component={Dashboard}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                path={URL_MY_EXAMS}
                component={MyExams}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                exact
                path={`${URL_EXAM}/:examId`}
                component={Exam}
                privateRoute
                layout={ExamLayout}
              />
              <AppRoute path={URL_LOGIN} component={Login} />
              <AppRoute path={`*`} component={NotFound} privateRoute />
            </Switch>
          </Router>
        </QueryClientProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default Root;
