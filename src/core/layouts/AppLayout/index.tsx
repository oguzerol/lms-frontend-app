import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100vh",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
    overflowY: "scroll",
    padding: theme.spacing(3),
  },
}));

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default AppLayout;
