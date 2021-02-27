import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "../pages/App";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import getTheme from "../core/theme";

import AppRoute from "./route/AppRoute";
import { URL_HOME, URL_LOGIN } from "./route/constants";
import { useSelector } from "react-redux";
import { selectTheme } from "./redux/slices/theme";

const Root = () => {
  const theme1 = useSelector(selectTheme);
  console.log(theme1);

  return (
    <ThemeProvider theme={getTheme("dark")}>
      <CssBaseline />
      <Router>
        <Switch>
          <AppRoute
            exact
            path={URL_HOME}
            component={App}
            privateRoute
            layout={AppLayout}
          />
          <AppRoute exact path={URL_LOGIN} component={Login} />
          <AppRoute path={`*`} component={NotFound} privateRoute />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Root;
