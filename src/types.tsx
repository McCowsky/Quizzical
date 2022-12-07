export interface IQuestion {
  category: number;
  difficulty: string;
}
export interface QuestionProps {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  selectedAnswer: string;
  clickedAnswer: (questionId: string, answer: string) => void;
  checkingAnswers: boolean;
  acceptingAnswers: boolean;
}
