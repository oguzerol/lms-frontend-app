import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import { Switch } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { deleteAuth } from "../../../../redux/auth";
import { URL_HOME, URL_LOGIN } from "../../../../route/constants";
import ydtLogoDark from "../../../../../assets/images/ydt_logo_dark.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    hide: {
      display: "none",
    },
    flexGrow: {
      flexGrow: 1,
    },
    ydtLogo: {
      width: 90,
    },
  })
);

type Props = {
  open: boolean;
};

const Topbar = ({ open }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const handleLogout = () => {
    dispatch(deleteAuth());
    localStorage.removeItem("token");
    axios.defaults.headers.common.token = null;
    history.replace(URL_LOGIN);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      className={clsx(classes.appBar)}
    >
      <Toolbar>
        <Link to={URL_HOME}>
          <img src={ydtLogoDark} alt="YDT logo" className={classes.ydtLogo} />
        </Link>
        <div className={classes.flexGrow} />
        <Switch
          checked
          // onChange={handleThemeChange}
          color="secondary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <IconButton color="inherit" onClick={handleLogout}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
