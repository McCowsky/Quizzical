import { IQuestion } from "../../types";

const fetchQuestions = (formData: IQuestion) => {
  const searchParams = new URLSearchParams({
    amount: "5",
    category: formData.category >= 9 ? formData.category.toString() : "",
    difficulty: formData.difficulty !== "any" ? formData.difficulty : "",
  });

  const apiUrl = `https://opentdb.com/api.php?${searchParams}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data.results);
};

export default fetchQuestions;
