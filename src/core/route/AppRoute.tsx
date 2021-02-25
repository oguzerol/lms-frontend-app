import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth";

import EmptyLayout from "../layouts/EmptyLayout";
import { URL_LOGIN } from "./constants";

type Props = {
  component: React.FC<RouteComponentProps>;
  path: string;
  layout?: React.FunctionComponent | typeof EmptyLayout;
  privateRoute?: boolean;
  exact?: boolean;
};

const AppRoute = ({
  component: Component,
  path,
  layout: Layout = EmptyLayout,
  privateRoute = false,
  exact = false,
  ...rest
}: Props) => {
  const auth = useSelector(selectAuth);
  const { isAuthenticated, isLoading } = auth;

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
