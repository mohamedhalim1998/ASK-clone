import { apiCall } from "./ApiMiddleware";

export const addQuestion = (
  question: string,
  to: string,
  anonymously: boolean
) =>
  apiCall({
    url: "http://localhost:8080/question/add",
    method: "POST",
    useJwtToken: true,
    body: {
      question,
      to,
      anonymously,
    },
  });
