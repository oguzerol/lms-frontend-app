import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLefttIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { URL_HOME } from "../../../../route/constants";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";

type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
  isSidebarOpen: boolean;
};

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      marginTop: 65,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      marginTop: 65,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    icon: {
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
    },
    link: {
      display: "flex",
      alignItems: "center",
      color: "inherit",
      textDecoration: "none",
    },
    active: {
      color: theme.palette.secondary.main,

      fontWeight: theme.typography.fontWeightMedium,
      "& .MuiListItemIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
  })
);

type Page = {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
};

const pages = [
  {
    id: 0,
    title: "Dashboard",
    href: URL_HOME,
    icon: <HomeIcon />,
  },
  {
    id: 1,
    title: "Sınavlarım",
    href: "/sinavlar",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: "Sonuçlarım",
    href: "/sonuclar",
    icon: <HomeIcon />,
  },
];

const SideBar = ({ open, handleDrawerToggle, isSidebarOpen }: Props) => {
  const classes = useStyles();

  return (
    <Drawer
      color="transparent"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle}>
          {isSidebarOpen ? <ChevronLefttIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {pages.map((page: Page) => (
          <ListItem key={page.id}>
            <NavLink
              color="inherit"
              to={page.href}
              className={classes.link}
              activeClassName={classes.active}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
