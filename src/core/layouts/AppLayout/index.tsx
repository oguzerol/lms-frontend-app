import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Topbar from "./components/Topbar";
import SideBar from "./components/Sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      marginTop: 65,
      flexGrow: 1,
      padding: theme.spacing(3),
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
