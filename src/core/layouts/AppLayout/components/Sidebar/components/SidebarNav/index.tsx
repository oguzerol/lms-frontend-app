// TODO; TSX, ref problem here
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    color: theme.palette.primary.light,
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.secondary.light,

    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.secondary.light,
    },
  },
}));

type Page = {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  pages: Array<Page>;
  className: string;
  closeNav: () => void;
};

const SidebarNav = ({ pages, className, closeNav }: Props) => {
  const classes = useStyles();

  const handleOnClick = () => {
    closeNav();
  };

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map((page: Page) => (
        <ListItem className={classes.item} disableGutters key={page.id}>
          <NavLink
            to={page.href}
            onClick={handleOnClick}
            className={classes.button}
            activeClassName={classes.active}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
