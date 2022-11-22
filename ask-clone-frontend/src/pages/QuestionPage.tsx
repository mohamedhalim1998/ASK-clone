import React, { FC, useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { useNavigate, useParams } from "react-router-dom";
import AnswerQuestionCard from "../components/AnswerQuestionCard";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  answerQuestion,
  getAllQuestions,
  getQuestion,
  questionSelector,
  updateLoadingQuestions,
} from "../store/InboxReduer";

function Question() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading: boolean = useAppSelector((state) => state.inbox.loading);
  const question = useAppSelector(questionSelector(+id!));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateLoadingQuestions(true));
    dispatch(getQuestion(+id!));
  }, []);
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <LoadingIcons.Bars height={30} />
      </div>
    );
  }
  if (!question) {
    return <div>not found</div>;
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
