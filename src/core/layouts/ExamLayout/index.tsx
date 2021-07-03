import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Topbar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  content: {
    height: "100%",
    padding: theme.spacing(3),
  },
}));

type Props = {
  children: React.ReactNode;
};

const ExamLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

ExamLayout.propTypes = {
  children: PropTypes.node,
};

export default ExamLayout;
