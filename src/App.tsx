import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import fetchQuestions from "./services";
import { AiOutlineHome } from "react-icons/ai";

function App() {
  interface IQuestion {
    category: number;
    difficulty: string;
  }

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
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={formChange}
              className="w-48 h-8 sm:w-auto sm:h-10 pl-2 mb-3 shadow-[0_0px_5px_0px_rgba(0,0,0,0.5)]"
            >
              <option value="0">any</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musical & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature </option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
            </select>

            <label htmlFor="difficulty">difficulty:</label>
            <select
              name="difficulty"
              id="difficulty"
              value={formData.difficulty}
              onChange={formChange}
              className="h-10 pl-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.5)]"
            >
              <option value="any">any</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
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
