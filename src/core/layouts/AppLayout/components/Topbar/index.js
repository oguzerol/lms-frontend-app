import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
// import ydtLogo from "../../../../../assets/images/ydt_logo.png";
import ydtLogoDark from "../../../../../assets/images/ydt_logo_dark.png";
import { deleteAuth } from "../../../../redux/auth";
import { URL_LOGIN } from "../../../../route/constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  ydtLogo: {
    width: 90,
  },
}));

const Topbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { className, onSidebarOpen, ...rest } = props;
  // const themeMode = useSelector((state) => state.theme);

  const classes = useStyles();

  const handleLogout = () => {
    dispatch(deleteAuth());
    localStorage.removeItem("token");
    axios.defaults.headers.common.token = null;
    history.replace(URL_LOGIN);
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="transparent"
    >
      <Toolbar>
        <RouterLink to="/">
          <img src={ydtLogoDark} alt="YDT logo" className={classes.ydtLogo} />
        </RouterLink>

        <div className={classes.flexGrow} />
        <IconButton color="inherit" onClick={onSidebarOpen}>
          <MenuIcon />
        </IconButton>
        <Switch
          className={classes.themeChanger}
          checked
          // onChange={handleThemeChange}
          color="secondary"
          name="themeSwitch"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={handleLogout}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
