import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerQuestionCard from "../components/AnswerQuestionCard";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  answerQuestion,
  getAllQuestions,
  questionSelector,
  updateLoadingQuestions,
} from "../store/InboxReduer";

function Question() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const question = useAppSelector(questionSelector(+id!));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateLoadingQuestions(true));
    dispatch(getAllQuestions());
  }, []);
  if (!question) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="w-2/3 mx-auto pt-2 text-white">
        <div className="w-2/3">
          <AnswerQuestionCard
            label={question.question}
            username={question.from}
            fullname={question.fromFullName}
            profilePic={question.fromProfileImage}
            onSubmit={(answer, answerImage) => {
              dispatch(answerQuestion(question, answer, answerImage));
              navigate("/user/inbox");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Question;
