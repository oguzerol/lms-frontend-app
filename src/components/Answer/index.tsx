import { answerLabel } from "../../core/utils/constants/exam";
import Item from "./Item";

// TODO mutliple types 0001

type CurrentQuestionAnswer = {
  id: number;
  answer_id: number;
  content: String;
};

const AnswerList = ({
  currentQuestionAnswers,
  currentQuestionIndex,
  currentQuestionId,
  changeAnswer,
  userAnswer,
}: {
  currentQuestionAnswers?: Array<CurrentQuestionAnswer>;
  currentQuestionIndex: number;
  currentQuestionId?: number;
  changeAnswer: Function;
  userAnswer?: number;
}) => {
  return !currentQuestionAnswers ? null : (
    <div>
      {currentQuestionAnswers.map((answer, item) => {
        return (
          <Item
            key={answer.id}
            handleChange={() =>
              changeAnswer({
                questionIndex: currentQuestionIndex,
                questionId: currentQuestionId,
                answerId: answer.id,
              })
            }
            isSelected={userAnswer === answer.id}
            label={answer.content}
            text={answerLabel[item]}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
