import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flex: 1,
      width: "100%",
      justifyContent: "left",
      textAlign: "left",
      padding: "6px 20px",
      lineHeight: "1.50",
      "&:not(:last-child)": {
        marginBottom: "20px",
      },
      "&.MuiButton-text": {
        border: "1px solid transparent",
      },
      "&.MuiButton-outlined": {
        backgroundColor: theme.palette.grey[800],
        border: `1px solid ${theme.palette.grey[700]}`,
        color: theme.palette.info.contrastText,
      },
    },

    icon: {
      paddingRight: "25px",
      fontSize: "22px",
      lineHeight: "25px",
    },
  };
});

const Answer = ({
  handleChange,
  isSelected,
  text,
  label,
}: {
  handleChange: Function;
  isSelected?: Boolean;
  text: String;
  label: String;
}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      onClick={() => handleChange()}
      variant={isSelected ? "outlined" : "text"}
    >
      <span className={classes.icon}>{text}</span>
      <span>{label}</span>
    </Button>
  );
};

export default Answer;
