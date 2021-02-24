import { Route, Redirect, RouteComponentProps } from "react-router-dom";

import EmptyLayout from "../layouts/EmptyLayout";

type Props = {
  component: React.FC<RouteComponentProps>;
  layout: React.FunctionComponent | typeof EmptyLayout;
  privateRoute: Boolean;
};

const AppRoute = ({
  component: Component,
  layout: Layout = EmptyLayout,
  privateRoute,
  ...rest
}: Props) => {
  const [isLoading, isAuthenticated] = [true, false];

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
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <div>...Loading</div>
            </div>
          );
        }
        if (privateRoute && isAuthenticated === false) {
          return <Redirect to="/login" />;
        }
        return renderLayout(props);
      }}
    />
  );
};

export default AppRoute;
