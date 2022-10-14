import Like from "./Like";
import Question from "./Question";

export interface Answer {
  id: number;
  answer: string;
  answerImage: string;
  date: number;
  question: Question;
//   questionId: number;
//   question: string;
//   to: string;
//   toFullName: string;
//   toProfileImage: string;
//   from: string;
//   fromProfileImage: string;
//   fromFullName: string;
  likes: Like[];
}
