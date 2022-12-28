import React, { FC, useEffect } from "react";
import Navbar from "../components/Navbar";
import { DeleteIcon } from "../utils/Icons";
import {
  deleteAllQuestions,
  deleteQuestion,
  getAllQuestions,
  InboxState,
  updateLoadingQuestions,
  updateLoadMoreQuestions,
} from "../store/InboxReduer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormat";
import Question from "../model/Question";
import ProfileImage from "../components/ProfileImage";
import LoadingIcons from "react-loading-icons";

function Inbox() {
  const dispatch = useAppDispatch();
  const inboxState: InboxState = useAppSelector((state) => state.inbox);
  useEffect(() => {
    dispatch(updateLoadingQuestions(true));
    dispatch(getAllQuestions());
  }, []);
  const onScroll = (e: Event) => {
    const max =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const inBottom = window.scrollY >= max - 10;
    const page = inboxState.questions.length / 20;
    if (inBottom && !inboxState.loadMore) {
      dispatch(updateLoadMoreQuestions(true));
      dispatch(getAllQuestions(page));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [inboxState.questions, inboxState.loadMore]);
  if (inboxState.loadingQuestions) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <LoadingIcons.Bars height={30} />
      </div>
    );
  }
  
  console.log(inboxState);
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="bg-white rounded-md w-2/3 text-gray-900 px-4 py-4">
          <div className="flex flex-row py-2 justify-between">
            <h3 className="text-xl font-semibold">Questions</h3>
            <div
              className="flex flex-row text-gray-400 cursor-pointer my-auto hover:text-gray-700 h-full"
              onClick={() => {
                dispatch(deleteAllQuestions());
              }}
            >
              <DeleteIcon className="w-4 h-4" />
              <p className="text-xs px-2 my-auto h-fit pt-px">
                Delete all questions
              </p>
            </div>
          </div>
          <div>
          {inboxState.questions.map((question) => (
            <QuestionCard {...question} />
          ))}
             {inboxState.loadMore && (
                  <div className="w-full h-fit flex flex-col justify-center items-center">
                    <LoadingIcons.Bars height={30} />
                  </div>
                )}
       </div>
        </div>
      </div>
    </div>
  );
}

const QuestionCard: FC<Question> = (params) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex felx-row">
        {ProfileImage(params.fromProfileImage)}
        <div className="px-2">
          {params.from && (
            <Link
              className="text-gray-800 font-semibold text-xs block"
              to={`/user/${params.from}`}
            >
              {params.from}
            </Link>
          )}
          <Link
            to={`/user/question/${params.id}`}
            className="text-gray-800 font-bold text-sm py-.5"
          >
            {params.question}
          </Link>
          <p className="text-gray-400 text-xs">{formatDate(params.date!)}</p>
        </div>
      </div>
      <DeleteIcon
        className="h-6 w-6 text-gray-400 my-auto cursor-pointer"
        onClick={() => {
          dispatch(deleteQuestion(params.id));
        }}
      />
    </div>
  );
};

export default Inbox;
