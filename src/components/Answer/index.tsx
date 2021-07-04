import { answerLabel } from "../../core/utils/constants/exam";
import Item from "./Item";

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

const AnswerList = ({
  currentQuestionAnswers,
  currentQuestionIndex,
  currentQuestionId,
  changeAnswer,
  userAnswers,
}: {
  currentQuestionAnswers: Array<CurrentQuestionAnswer>;
  currentQuestionIndex: number;
  currentQuestionId: number;
  changeAnswer: Function;
  userAnswers: Array<UserAnswer>;
}) => {
  const currentQuestionSelectedAnswer =
    userAnswers &&
    userAnswers.find((answer) => answer.question_id === currentQuestionId);
  return !currentQuestionAnswers ? null : (
    <div>
      {currentQuestionAnswers.map((answer, item) => {
        return (
          <Item
            key={answer.id}
            handleChange={() =>
              changeAnswer({
                current_question_index: currentQuestionIndex,
                question_id: currentQuestionId,
                answer_id: answer.id,
              })
            }
            isSelected={
              currentQuestionSelectedAnswer &&
              currentQuestionSelectedAnswer.answer_id === answer.id
            }
            label={answer.content}
            text={answerLabel[item]}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
