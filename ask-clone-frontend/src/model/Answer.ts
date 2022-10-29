import Like from "./Like";
import Question from "./Question";

export interface Answer {
  id: number;
  answer: string;
  answerImage: string;
  date: number;
  question: Question;
  followQuestionConuter: number;
  likes: Like[];
}
