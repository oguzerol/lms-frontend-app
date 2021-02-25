import { BrowserRouter as Router, Switch } from "react-router-dom";
import App from "../pages/App";
import Login from "../pages/Login";
import AppLayout from "./layouts/AppLayout";

import AppRoute from "./route/AppRoute";
import { URL_HOME, URL_LOGIN } from "./route/constants";

const Root = () => {
  return (
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
      </Switch>
    </Router>
  );
};

export default Root;
