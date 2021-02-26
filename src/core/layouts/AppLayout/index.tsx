import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Topbar from "./components/Topbar";
import SideBar from "./components/Sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      overflow: "hidden",
      minHeight: "100vh",
    },
    content: {
      [theme.breakpoints.up("sm")]: {
        marginTop: 67,
      },
      marginTop: 58,
      flexGrow: 1,
      padding: theme.spacing(3),
      minWidth: 300,
    },
  })
);

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Topbar open={open} handleDrawerToggle={handleDrawerToggle} />
      <SideBar open={open} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default AppLayout;
