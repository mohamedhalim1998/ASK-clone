import React, { FC } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormat";
import { LikeIcon } from "../utils/Icons";
interface AnswerCardParams {
  question?: string;
  answer?: string;
  date?: number;
  from?: string;
  fromUsername?: string;
  showProfile?: boolean;
  to?: string;
  toUsername?: string;
  toProfileImage?: string;
}
const AnswerCard: FC<AnswerCardParams> = (params) => {
  return (
    <div className="bg-white rounded-md w-full my-2 p-4 text-themeblack">
      <h3 className="font-semibold text-xl" dir="auto">
        {params.question}
        {params.from && (
          <Link
            to={`/user/${params.fromUsername}`}
            className="text-gray-400 text-base"
          >
            {" "}
            {params.from}
          </Link>
        )}
      </h3>
      {params.showProfile && (
        <div className="flex flex-row">
          {ProfileImage(params.toProfileImage)}
          <div className="my-auto mx-2">
            <p className="font-semibold">{params.to}</p>
            <p className="text-gray-400 text-xs">{formatDate(params.date!)}</p>
          </div>
        </div>
      )}
      {!params.showProfile && (
        <p className="text-gray-400 text-xs">{formatDate(params.date!)}</p>
      )}
      <div className="">
        <p dir="auto" className="text-base ">
          {params.answer}
        </p>
      </div>
      <div className="h-px w-full bg-gray-300 my-2 mx-auto"></div>
      <div className="flex flex-row">
        <LikeIcon />
      </div>
    </div>
  );
};
const ProfileImage = (url?: string) => {
  return (
    <div
      className="rounded-full bg-center w-10 h-10 bg-cover opacity-80"
      style={{
        backgroundImage: ` url(http://localhost:8080/image/${url})`,
      }}
    />
  );
};

export default AnswerCard;
