import Like from "./Like";

export default interface Question {
  id: string;
  question: string;
  answer: string;
  answerImage: string;
  date: number;
  from: string;
  fromUsername: string;
  fromProfileImage: string;
  likes: Like[];
}
