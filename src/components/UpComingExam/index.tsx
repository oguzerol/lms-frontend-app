import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectAuth } from "../../core/redux/slices/auth";
import UpcomingExamCard from "./UpcomingExamCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "150px",
      padding: theme.spacing(4),
    },
    pageLoad: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  })
);

const UpComingExam = () => {
  const classes = useStyles();
  const { user } = useSelector(selectAuth);

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Merhaba {user?.username}</Typography>
      <UpcomingExamCard />
    </Paper>
  );
};

export default UpComingExam;
