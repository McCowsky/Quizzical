import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import fetchQuestions from "./features/questions/services";
import { AiOutlineHome } from "react-icons/ai";
import { IQuestion } from "./types";
import SelectCategory from "./shared/components/select/SelectCategory";
import SelectDifficulty from "./shared/components/select/SelectDifficulty";

function App() {
  const [gameOn, setGameOn] = useState<boolean>(false);
  const [checkingAnswers, setcheckingAnswers] = useState<boolean>(false);
  const [questionArray, setQuestionArray] = useState([] as any[]);
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

  const questionElements = questionArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      selectedAnswer={question.selectedAnswer}
      clickedAnswer={clickedAnswer}
      checkingAnswers={checkingAnswers}
      acceptingAnswers={question.acceptingAnswers}
    />
  ));

  function startGame() {
    setGameOn((prevGameState) => !prevGameState);
    setGames(1);
    setTotalPoints(0);
  }
  function checkAnswers() {
    setcheckingAnswers((prevCheckingAnswersState) => !prevCheckingAnswersState);
    setAcceptingAnswers(false);
    questionArray.forEach((question) => {
      if (question.selectedAnswer === question.correct_answer) {
        setPoints((prevPointsCount) => prevPointsCount + 1);
      }
    });
  }

  useEffect(() => {
    setTotalPoints((prevTotalPointsCount) => prevTotalPointsCount + points);
  }, [points]);

  function playAgain() {
    setcheckingAnswers((prevCheckingAnswersState) => !prevCheckingAnswersState);
    setPoints(0);
    setGames((prevGamesCount) => prevGamesCount + 1);
  }
  function clickedAnswer(questionId: string, answer: string) {
    if (checkingAnswers) return;
    setQuestionArray((prevQuestionArray) =>
      prevQuestionArray.map((question) =>
        question.id === questionId ? { ...question, selectedAnswer: answer } : question
      )
    );
  }

  function formChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function backToMenu() {
    setGameOn((prevGameState) => !prevGameState);
    setGames(0);
  }
  if (loading) {
    return <h2 className="font-bold text-4xl text-center">Loading...</h2>;
  }
  return (
    <div className="w-full sm:w-[700px] sm:h-[700px] bg-[#F5F7FB] flex justify-center items-center">
      {!gameOn ? (
        <header
          style={{ display: !gameOn ? "flex" : "none" }}
          className="flex-col gap-4 justify-center items-center h-[100vh] sm:relative"
        >
          <h1 className="font-bold text-4xl text-center">Quizzical</h1>
          <form action="" className="my-0 mx-auto flex flex-col gap-1">
            <label htmlFor="category">category:</label>
            <SelectCategory category={formData.category} handleChange={formChange} />
            <label htmlFor="difficulty">difficulty:</label>
            <SelectDifficulty
              difficulty={formData.difficulty}
              handleChange={formChange}
            />
          </form>
          <button
            className="block font-inter text-white py-3 px-11 bg-[#4D5B9E] rounded-2xl my-0 mx-auto mt-6"
            onClick={startGame}
          >
            Start quiz
          </button>
          <h5 className="absolute bottom-10 left-0 right-0 text-center text-sm">
            Mateusz McCowsky Makowski, 2022
          </h5>
        </header>
      ) : (
        <main className=" w-full sm:w-[700px] sm:h-[700px] bg-[#F5F7FB] pt-14 sm:pt-0">
          <div className="text-black w-full ">{questionElements}</div>
          <div className="flex justify-center items-center sm:mt-4 pb-2 sm:pb-0">
            {!checkingAnswers ? (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-10">
                <p className="font-bold text-lg">Game {games}</p>
                <p className="font-bold text-lg">
                  {totalPoints} out of {games * 5 - 5} points
                </p>

                <button
                  className="block font-inter text-white py-3 px-11 bg-[#4D5B9E] rounded-2xl"
                  onClick={checkAnswers}
                >
                  Check answers
                </button>
                <button onClick={backToMenu}>
                  <AiOutlineHome size="2.5rem" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-10">
                <p className="font-bold text-lg">You scored {points}/5 correct answers</p>
                <button
                  className="block font-inter text-white py-3 px-11 bg-[#4D5B9E] rounded-2xl  "
                  onClick={playAgain}
                >
                  Play again
                </button>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
