import { IQuestion } from "../../types";

const fetchQuestions = (formData: IQuestion) => {
  let categoryQuery = "";
  let difficultyQuery = "";
  if (formData.category >= 9) categoryQuery = `&category=${formData.category}`;
  if (formData.difficulty !== "any")
    difficultyQuery = `&difficulty=${formData.difficulty}`;

  const apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data.results);
};

export default fetchQuestions;
