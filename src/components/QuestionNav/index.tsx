import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { IconButton } from "@material-ui/core";

const Nav = ({
  next = false,
  currentQuestionIndex,
  changeCurrentQuestion,
}: {
  next?: boolean;
  currentQuestionIndex: number;
  changeCurrentQuestion: Function;
}) => {
  const handleClick = () => {
    const newQuestionNumber = next
      ? currentQuestionIndex + 1
      : currentQuestionIndex - 1;
    if (!(newQuestionNumber <= -1 || newQuestionNumber > 79)) {
      changeCurrentQuestion(newQuestionNumber);
    }
  };
  return (
    <IconButton onClick={handleClick}>
      {next ? (
        <ArrowForwardIcon fontSize="large" />
      ) : (
        <ArrowBackIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default Nav;
