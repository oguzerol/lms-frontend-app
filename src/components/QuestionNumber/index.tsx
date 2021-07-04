import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "absolute",
      top: 0,
      width: "100%",
      textAlign: "center",
    },
    currentQuestion: {
      paddingBottom: "22px",
      paddingTop: "5px",
      fontSize: "28px",
      margin: 0,
    },
  };
});

const QuestionNumber = ({
  currentQuestionIndex,
}: {
  currentQuestionIndex: Number;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.currentQuestion}>
        {currentQuestionIndex}
      </Typography>
    </div>
  );
};

export default QuestionNumber;
