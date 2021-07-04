import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontSize: "16px",
      marginBottom: "20px",
      padding: "0 20px 20px",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  };
});

const Subject = ({
  currentQuestionSubject,
}: {
  currentQuestionSubject?: String;
}) => {
  const classes = useStyles();

  return !currentQuestionSubject ? null : (
    <Typography className={classes.root}>{currentQuestionSubject}</Typography>
  );
};

export default Subject;
