import { Paper, makeStyles, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "12px",
      "& button": {
        textAlign: "center",
        minWidth: "inherit",
        borderRadius: "20px",
        height: "28px",
        width: "30px",
        lineHeight: "14px",
        padding: 0,
      },
      "& .MuiGrid-grid-xs-3": {
        maxWidth: "12%",
      },
    },
    container: {
      padding: "10px 0",
    },
    answered: {
      background: theme.palette.grey[800],
      color: theme.palette.secondary.contrastText,
    },
    buttonWrapper: {
      textAlign: "center",
      marginBottom: "10px",
    },
  };
});

type List = {
  question_id: number;
  isSelected: boolean;
};

const QuickView = ({
  list,
  changeCurrentQuestion,
}: {
  list?: Array<List>;
  changeCurrentQuestion: Function;
  questionsLength: number;
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container className={classes.container}>
        {list &&
          list.map((answer, index) => {
            return (
              <Grid
                item
                xs={3}
                key={`answer_${answer.question_id}`}
                className={classes.buttonWrapper}
              >
                <Button
                  onClick={() => changeCurrentQuestion(index)}
                  className={answer.isSelected ? classes.answered : ""}
                  variant={answer.isSelected ? "outlined" : "text"}
                >
                  {index + 1}
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </Paper>
  );
};

export default QuickView;
