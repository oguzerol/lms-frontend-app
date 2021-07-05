import { Box } from "@material-ui/core";

import Info from "./Info";
import Content from "./Content";
import Answer from "../Answer";

// TODO mutliple types 0001

type CurrentQuestionAnswer = {
  id: number;
  answer_id: number;
  content: String;
};

const Question = ({
  currentQuestionInfo,
  currentQuestionAnswers,
  currentQuestionIndex,
  currentQuestionId,
  changeAnswer,
  userAnswer,
  currentQuestionContent,
}: {
  currentQuestionInfo?: String;
  currentQuestionAnswers?: Array<CurrentQuestionAnswer>;
  currentQuestionIndex: number;
  currentQuestionId?: number;
  changeAnswer: Function;
  userAnswer?: number;
  currentQuestionContent?: String;
}) => {
  return (
    <Box>
      <Info currentQuestionInfo={currentQuestionInfo} />
      <Content currentQuestionContent={currentQuestionContent} />
      <Answer
        currentQuestionAnswers={currentQuestionAnswers}
        currentQuestionIndex={currentQuestionIndex}
        changeAnswer={changeAnswer}
        userAnswer={userAnswer}
        currentQuestionId={currentQuestionId}
      />
    </Box>
  );
};

export default Question;
