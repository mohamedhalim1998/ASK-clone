import React, { FC, useEffect } from "react";
import Navbar from "../components/Navbar";
import { DeleteIcon } from "../utils/Icons";
import {
  getAllQuestions,
  Question,
  InboxState,
  updateLoadingQuestions,
} from "../store/InboxReduer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";

function Inbox() {
  const dispatch = useAppDispatch();
  const inboxState: InboxState = useAppSelector((state) => state.inbox);
  useEffect(() => {
    dispatch(updateLoadingQuestions(true));
    dispatch(getAllQuestions());
  }, []);
  if (inboxState.loadingQuestions) {
    return <div>loading</div>;
  }
  console.log(inboxState);
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="bg-white rounded-md w-2/3 text-gray-900 px-4 py-4">
          <div className="flex flex-row py-2 justify-between">
            <h3 className="text-xl font-semibold">Questions</h3>
            <div className="flex flex-row text-gray-400 cursor-pointer my-auto hover:text-gray-700 h-full">
              <DeleteIcon className="w-4 h-4" />
              <p className="text-xs px-2 my-auto h-fit pt-px">
                Delete all questions
              </p>
            </div>
          </div>
          {inboxState.questions.map((question) => (
            <QuestionCard {...question} />
          ))}
          {/*           
          <QuestionCard
            question="الاعتذار بيقلل من قيمه الشخص؟"
            date={152568465186}
            fromProfileImage="2ca9c44a-3a31-4204-b544-6d85ee94bd6a.png"
            from="Marwa Khayal"
          /> */}
        </div>
      </div>
    </div>
  );
}

const QuestionCard: FC<Question> = (params) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex felx-row">
        {ProfileImage(
          "http://localhost:8080/image/".concat(
            params.fromProfileImage !== null
              ? params.fromProfileImage
              : "blank-profile-pic.png"
          )
        )}
        <div className="px-2">
          {params.from && (
            <Link
              className="text-gray-800 font-semibold text-xs block"
              to={`/user/${params.fromUsername}`}
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
          <p className="text-gray-400 text-xs">{params.date}</p>
        </div>
      </div>
      <DeleteIcon className="h-6 w-6 text-gray-400 my-auto cursor-pointer" />
    </div>
  );
};

const ProfileImage = (url: string) => {
  return (
    <div
      className="rounded-full bg-center w-10 h-10 bg-cover"
      style={{
        backgroundImage: ` url(${url})`,
      }}
    />
  );
};

export default Inbox;
