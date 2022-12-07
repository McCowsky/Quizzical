import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import SelectCategory from "../shared/components/select/selectCategory/SelectCategory";
import SelectDifficulty from "../shared/components/select/selectDifficulty/SelectDifficulty";
import useGame from "./hooks/useGame";

const App: React.FC = () => {
  const {
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
  } = useGame();

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
};

export default App;
