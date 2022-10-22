import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AskQuestionCard from "../components/AskQuestionCard";
import Navbar from "../components/Navbar";
import { friendSelector } from "../store/FirendsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuestion } from "../store/InboxReduer";

function AskUserPage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();

  const friend = useAppSelector(friendSelector(username!));
  const submitQuestion = (question: string, anonymously: boolean) => {
    dispatch(addQuestion(question, friend.username, anonymously));
  };
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="rounded-md w-2/3 text-white">
          <AskQuestionCard
            label={`Ask @${friend.username}`}
            onSubmit={submitQuestion}
            allowAnonymously={friend.allowAnoymousQuestions}
          />
        </div>
      </div>
    </div>
  );
}

export default AskUserPage;
