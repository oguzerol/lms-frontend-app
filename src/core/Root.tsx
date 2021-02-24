import { BrowserRouter as Router, Switch } from "react-router-dom";
import App from "../pages/App";

import AppRoute from "./route/AppRoute";
import { URL_HOME } from "./route/constants";

const Root = () => {
  return (
    <Router>
      <Switch>
        <AppRoute exact path={URL_HOME} component={App} />
      </Switch>
    </Router>
  );
};

export default Root;
