import React from "react";
import clsx from "clsx";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button, Box, Divider } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import SidebarNav from "./components/SidebarNav";
import { URL_HOME } from "../../../../route/constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    padding: theme.spacing(2),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  button: {
    padding: "10px 8px",
    textAlign: "center",
    display: "block",
    letterSpacing: 0,
    fontSize: "18px",
    lineHeight: "18px",
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  active: {
    color: theme.palette.secondary.light,
    "& $icon": {
      color: theme.palette.secondary.light,
      marginRight: 0,
    },
  },
  icon: {
    fontSize: "40px",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  open: boolean;
  variant: "permanent" | "persistent" | "temporary" | undefined;
  onClose: () => void;
  className?: string;
};

const Sidebar = (props: Props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      id: 0,
      title: "Dashboard",
      href: URL_HOME,
      icon: <DashboardIcon />,
    },
    {
      id: 1,
      title: "Sınavlarım",
      href: "/sinavlar",
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: "Sonuçlarım",
      href: "/sonuclar",
      icon: <DashboardIcon />,
    },
  ];

  return (
    // ! STRICT MODE
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} closeNav={onClose} />
        <Box>
          <Divider component="div" className="my-2" />
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={RouterLink}
            onClick={() => {
              onClose();
            }}
            to="/settings/profile"
          >
            <PersonOutlineIcon className={classes.icon} />
            <p className="text-weight-bold my-1">Profilim</p>
          </Button>
        </Box>
      </div>
    </Drawer>
  );
};

export default Sidebar;
