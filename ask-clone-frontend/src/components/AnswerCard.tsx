import React, { FC } from "react";
import { Link } from "react-router-dom";
import Like from "../model/Like";
import { Profile } from "../model/Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addLike, removeLike } from "../store/LikeReducer";
import { ProfileState } from "../store/ProfileReducer";
import { formatDate } from "../utils/DateFormat";
import { LikeIcon } from "../utils/Icons";
interface AnswerCardParams {
  id?: string;
  question?: string;
  answer?: string;
  date?: number;
  from?: string;
  fromUsername?: string;
  showProfile?: boolean;
  to?: string;
  toUsername?: string;
  toProfileImage?: string;
  likes: Like[];
}
const AnswerCard: FC<AnswerCardParams> = (params) => {
  const dispatch = useAppDispatch();
  const profile: Profile = useAppSelector((state) => state.profile.profile);
  const liked =
    params.likes.map((l) => l.from).indexOf(profile.username) !== -1;
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
        <LikeIcon
          liked={liked}
          onClick={() => {
            if (liked) {
              dispatch(removeLike(+params.id!));
            } else {
              dispatch(addLike(+params.id!));
            }
          }}
        />
        <p className="my-auto font-semibold mx-2 pt-1">{params.likes.length}</p>
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
