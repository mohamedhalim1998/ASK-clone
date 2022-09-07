import moment from "moment";
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
    <div className="bg-white rounded-md w-full p-4 text-themeblack">
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
          <img
            src="https://cuad.ask.fm/3c8/35d77/5630/4fad/b7c3/eff86398c263/normal/116045.jpg"
            className="rounded-full w-9 h-9 m-2"
            alt=""
          />
          <div className="my-auto">
            <p className="font-semibold">هاني عبد الله</p>
            <p className="text-gray-400 text-xs">July 22, 2022</p>
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

export default AnswerCard;
