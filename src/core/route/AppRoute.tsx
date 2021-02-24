import { Route, Redirect, RouteComponentProps } from "react-router-dom";

import EmptyLayout from "../layouts/EmptyLayout";
import { URL_LOGIN } from "./constants";

type Props = {
  component: React.FC<RouteComponentProps>;
  path: String;
  layout?: React.FunctionComponent | typeof EmptyLayout;
  privateRoute?: Boolean;
  exact?: Boolean;
};

const AppRoute = ({
  component: Component,
  path,
  layout: Layout = EmptyLayout,
  privateRoute = false,
  exact = false,
  ...rest
}: Props) => {
  const [isLoading, isAuthenticated] = [false, false];

  const renderLayout = (props: RouteComponentProps) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <div>...Loading</div>;
        }
        if (privateRoute && isAuthenticated === false) {
          return <Redirect to={URL_LOGIN} />;
        }
        return renderLayout(props);
      }}
    />
  );
};

export default AppRoute;
