import { apiCall } from "./ApiMiddleware";
import { getFeedAnswers } from "./FeedReducer";

export const addLike = (answerId: number) =>
  apiCall({
    url: "http://localhost:8080/like/add",
    method: "POST",
    useJwtToken: true,
    body: {
      answerId,
    },
    onSuccess: getFeedAnswers(),
  });

export const removeLike = (answerId: number) =>
  apiCall({
    url: "http://localhost:8080/like/delete",
    method: "DELETE",
    useJwtToken: true,
    body: {
      answerId,
    },
    onSuccess: getFeedAnswers(),
  });
