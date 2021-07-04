import { Box } from "@material-ui/core";

import Instruction from "./Instruction";
import Subject from "./Subject";
import Answer from "../Answer";

// TODO mutliple types 0001

type CurrentQuestionAnswer = {
  id: number;
  answer_id: number;
  content: String;
};

type UserAnswer = {
  question_id: number;
  answer_id: number;
};

const Question = ({
  currentQuestionInfo,
  currentQuestionAnswers,
  currentQuestionIndex,
  currentQuestionId,
  changeAnswer,
  userAnswers,
  currentQuestionSubject,
}: {
  currentQuestionInfo: String;
  currentQuestionAnswers: Array<CurrentQuestionAnswer>;
  currentQuestionIndex: number;
  currentQuestionId: number;
  changeAnswer: Function;
  userAnswers: Array<UserAnswer>;
  currentQuestionSubject: String;
}) => {
  return (
    <Box>
      <Instruction currentQuestionInfo={currentQuestionInfo} />
      <Subject currentQuestionSubject={currentQuestionSubject} />
      <Answer
        currentQuestionAnswers={currentQuestionAnswers}
        currentQuestionIndex={currentQuestionIndex}
        changeAnswer={changeAnswer}
        userAnswers={userAnswers}
        currentQuestionId={currentQuestionId}
      />
    </Box>
  );
};

export default Question;
