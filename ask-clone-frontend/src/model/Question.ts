export default interface Question {
  id: number;
  mainQuestionId: number;
  question: string;
  date: number;
  from: string;
  fromFullName: string;
  fromProfileImage: string;
  to: string;
  toFullName: string;
  toProfileImage: string;
  mainQuestion: string;
}
