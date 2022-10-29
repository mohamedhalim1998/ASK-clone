import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Answer } from "../model/Answer";
import { Profile } from "../model/Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addLike, removeLike } from "../store/LikeReducer";
import { formatDate } from "../utils/DateFormat";
import { LikeIcon, ReplayIcon, RightArrow } from "../utils/Icons";
import ProfileImage from "./ProfileImage";
interface AnswerCardParams {
  answer: Answer;
  showProfile?: boolean;
  showMore?: boolean;
  showReplay?: boolean;
}
const AnswerCard: FC<AnswerCardParams> = ({
  answer,
  showProfile,
  showMore,
  showReplay = true,
}) => {
  const dispatch = useAppDispatch();
  const profile: Profile = useAppSelector((state) => state.profile.profile);
  const liked =
    answer.likes.map((l) => l.from).indexOf(profile.username) !== -1;
  return (
    <div className="bg-white rounded-md w-full my-2 p-4 text-themeblack">
      <h3 className="font-semibold text-xl" dir="auto">
        {answer.question.question}
        {answer.question.from && (
          <Link
            to={`/user/${answer.question.from}`}
            className="text-gray-400 text-base"
          >
            {" "}
            {answer.question.fromFullName}
          </Link>
        )}
      </h3>
      {showProfile && (
        <div className="flex flex-row">
          <Link to={`/user/${answer.question.to}`}>
            {ProfileImage(answer.question.toProfileImage)}
          </Link>
          <div className="my-auto mx-2">
            <Link to={`/user/${answer.question.to}`} className="font-semibold block">
              {answer.question.toFullName}
            </Link>
            <Link
              className="text-gray-400 text-xs"
              to={`/user/${answer.question.to}/answer/${answer.id}`}
            >
              {formatDate(answer.question.date!)}
            </Link>
          </div>
        </div>
      )}
      {!showProfile && (
        <p className="text-gray-400 text-xs">{formatDate(answer.date!)}</p>
      )}
      <div className="">
        <p dir="auto" className="text-base ">
          {answer.answer}
        </p>

        {answer.answerImage && (
          <div className="w-full rounded-md my-4 overflow-hidden ">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:8080/image/${answer.answerImage}`}
              alt=""
            />
          </div>
        )}
      </div>
      {showMore && answer.followQuestionConuter !== 0 && (
        <Link
          to={`/user/${answer.question.to}/answer/${answer.id}`}
          className="flex flex-row justify-between w-full text-accent pt-2"
        >
          <p>{`+ ${answer.followQuestionConuter} 💬 message`}</p>
          <p>see all</p>
        </Link>
      )}
      <div className="h-px w-full bg-gray-300 my-2 mx-auto"></div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row w-full ">
          <LikeIcon
            liked={liked}
            onClick={() => {
              if (liked) {
                dispatch(removeLike(+answer.id!));
              } else {
                dispatch(addLike(+answer.id!));
              }
            }}
          />
          <p className="my-auto font-semibold mx-2 pt-1">
            {answer.likes.length}
          </p>
        </div>
        {showReplay && (
          <Link
            className="ml-auto"
            to={`/user/${answer.question.to}/ask/followup/${answer.id}`}
          >
            <ReplayIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
