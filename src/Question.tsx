import { nanoid } from "nanoid";
import { decode } from "html-entities";
//import arrayShuffle from "array-shuffle";

import React, { useEffect, useState } from "react";

interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selectedAnswer: string;
  clickedAnswer: any;
  checkingAnswers: boolean;
  acceptingAnswers: boolean;
}

const Question = (props: Question) => {
  let allAnswersElements = props.incorrectAnswers.map((incorrectAnswer: string) => {
    return (
      <button
        key={nanoid()}
        style={{
          backgroundColor:
            props.selectedAnswer === incorrectAnswer
              ? props.checkingAnswers
                ? "#F8BCBC"
                : "#D6DBF5"
              : "#F5F7FB",
        }}
        className="min-w-[60px] min-h-[20px] px-3 py-1 rounded-lg border-[1px] border-[#4D5B9E] text-xs sm:text-sm text-[#293264] font-semibold"
        onClick={() => {
          if (!props.acceptingAnswers) return;

          props.clickedAnswer(props.id, incorrectAnswer);
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
        backgroundColor: props.checkingAnswers
          ? "#94D7A2"
          : props.selectedAnswer === props.correctAnswer
          ? "#D6DBF5"
          : "#f5f7fb", //f5f7fb
      }}
      className={
        "min-w-[60px] min-h-[20px] px-3 py-1 rounded-lg border-[1px] border-[#4D5B9E] text-xs sm:text-sm text-[#293264] font-semibold"
      }
      onClick={() => {
        if (!props.acceptingAnswers) return;

        props.clickedAnswer(props.id, props.correctAnswer);
      }}
    >
      {decode(props.correctAnswer)}
    </button>
  );

  allAnswersElements.push(correctAnswerElement);

  allAnswersElements = allAnswersElements.sort((a: any, b: any) =>
    a.props.children.localeCompare(b.props.children)
  );

  return (
    <div className="flex flex-col gap-4 pb-5 px-3 sm:px-0">
      <h2 className="font-bold text-lg break-words w-full">{decode(props.question)}</h2>
      <div className="flex gap-3 font-inter flex-wrap ">{allAnswersElements}</div>
      <div className="w-full h-[1px] bg-[#DBDEF0]"></div>
    </div>
  );
};

export default Question;
