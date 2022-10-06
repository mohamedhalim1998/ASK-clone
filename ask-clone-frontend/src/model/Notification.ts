export interface Notification {
  id: number;
  from?: string;
  fromFullName?: string;
  fromProfileImage?: string;
  to: string;
  read: boolean;
  type: "QUESTION" | "ANSWER" | "LIKE";
  date: number;
  questionId: number;
  questionText: string;
}
