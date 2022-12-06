import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { QuestionProps } from "./types";
import React from "react";

const Question: React.FC<QuestionProps> = ({
  incorrectAnswers,
  selectedAnswer,
  checkingAnswers,
  acceptingAnswers,
  id,
  clickedAnswer,
  correctAnswer,
  question,
}) => {
  let allAnswersElements = incorrectAnswers.map((incorrectAnswer: string) => {
    return (
      <button
        key={nanoid()}
        style={{
          backgroundColor:
            selectedAnswer === incorrectAnswer
              ? checkingAnswers
                ? "#F8BCBC"
                : "#D6DBF5"
              : "#F5F7FB",
        }}
        className="min-w-[60px] min-h-[20px] px-3 py-1 rounded-lg border-[1px] border-[#4D5B9E] text-xs sm:text-sm text-[#293264] font-semibold"
        onClick={() => {
          if (!acceptingAnswers) return;

          clickedAnswer(id, incorrectAnswer);
        }}
      >
        {decode(incorrectAnswer)}
      </button>
    );
  });

  const correctAnswerElement = (
    <button
      key={nanoid()}
      style={{
        backgroundColor: checkingAnswers
          ? "#94D7A2"
          : selectedAnswer === correctAnswer
          ? "#D6DBF5"
          : "#f5f7fb", //f5f7fb
      }}
      className={
        "min-w-[60px] min-h-[20px] px-3 py-1 rounded-lg border-[1px] border-[#4D5B9E] text-xs sm:text-sm text-[#293264] font-semibold"
      }
      onClick={() => {
        if (!acceptingAnswers) return;

        clickedAnswer(id, correctAnswer);
      }}
    >
      {decode(correctAnswer)}
    </button>
  );

  allAnswersElements.push(correctAnswerElement);

  allAnswersElements = allAnswersElements.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );

  return (
    <div className="flex flex-col gap-4 pb-5 px-3 sm:px-0">
      <h2 className="font-bold text-lg break-words w-full">{decode(question)}</h2>
      <div className="flex gap-3 font-inter flex-wrap ">{allAnswersElements}</div>
      <div className="w-full h-[1px] bg-[#DBDEF0]"></div>
    </div>
  );
};

export default Question;
