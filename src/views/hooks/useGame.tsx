import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Question from "../../shared/components/question/Question";
import fetchQuestions from "../../features/questions/services";
import { IQuestion, QuestionProps } from "../../types";

const useGame = () => {
  const [gameOn, setGameOn] = useState<boolean>(false);
  const [checkingAnswers, setcheckingAnswers] = useState<boolean>(false);
  const [questionArray, setQuestionArray] = useState<QuestionProps[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [games, setGames] = useState<number>(0);
  const [formData, setFormData] = useState<IQuestion>({
    category: 0,
    difficulty: "any",
  });
  const [acceptingAnswers, setAcceptingAnswers] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchQuestions(formData)
      .then((questions) => {
        return setQuestionArray(
          questions.map((question: []) => {
            return {
              id: nanoid(),
              ...question,
              selectedAnswer: "",
              acceptingAnswers: true,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [games]);

  const clickedAnswer = (questionId: string, answer: string) => {
    if (checkingAnswers) return;
    setQuestionArray((prevQuestionArray) =>
      prevQuestionArray.map((question) =>
        question.id === questionId ? { ...question, selectedAnswer: answer } : question
      )
    );
  };

  const questionElements = questionArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correct_answer={question.correct_answer}
      incorrect_answers={question.incorrect_answers}
      selectedAnswer={question.selectedAnswer}
      clickedAnswer={clickedAnswer}
      checkingAnswers={checkingAnswers}
      acceptingAnswers={question.acceptingAnswers}
    />
  ));

  const startGame = () => {
    setGameOn((prevGameState) => !prevGameState);
    setGames(1);
    setTotalPoints(0);
  };
  const checkAnswers = () => {
    setcheckingAnswers((prevCheckingAnswersState) => !prevCheckingAnswersState);
    setAcceptingAnswers(false);
    questionArray.forEach((question) => {
      if (question.selectedAnswer === question.correct_answer) {
        setPoints((prevPointsCount) => prevPointsCount + 1);
      }
    });
  };

  useEffect(() => {
    setTotalPoints((prevTotalPointsCount) => prevTotalPointsCount + points);
  }, [points]);

  const playAgain = () => {
    setcheckingAnswers((prevCheckingAnswersState) => !prevCheckingAnswersState);
    setPoints(0);
    setGames((prevGamesCount) => prevGamesCount + 1);
  };

  const formChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const backToMenu = () => {
    setGameOn((prevGameState) => !prevGameState);
    setGames(0);
  };

  return {
    gameOn,
    checkingAnswers,
    points,
    totalPoints,
    games,
    formData,
    loading,
    questionElements,
    formChange,
    checkAnswers,
    startGame,
    backToMenu,
    playAgain,
  };
};

export default useGame;
