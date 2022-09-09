import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AskQuestionCard from "../components/AskQuestionCard";
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
  const question = useAppSelector(questionSelector(id!));
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
          <AskQuestionCard
            label={question.question}
            hint="Answer"
            showImage
            hideAnonymously
            removeLimit
            username={question.from}
            fullname={question.fromUsername}
            profilePic={question.fromProfileImage}
            onSubmit={(answer) => {
              dispatch(answerQuestion(id!, answer));
              navigate("/user/inbox");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Question;
