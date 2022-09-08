import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../store/GuestReducer";
import { useAppDispatch } from "../store/hooks";
import { changeStatus } from "../store/ProfileReducer";
import { addQuestion } from "../store/InboxReduer";
import { BioIcon, HashIcon, LinkIcon, LocationIcon } from "../utils/Icons";
import AnswerCard from "./AnswerCard";
import AskQuestionCard from "./AskQuestionCard";
import Navbar from "./Navbar";
import Switch from "./Switch";
import Question from "../model/Question";

interface UserProfileParams {
  guest: boolean;
  username: string;
  fullname: string;
  location: string;
  bio: string;
  links: string;
  profileImageUrl: string;
  coverImageUrl: string;
  status?: boolean;
  loading: boolean;
  followersCount?: number;
  likesCount: number;
  postsCount: number;
  follow?: boolean;
  answers?: Question[];
}

const UserProfile: FC<UserProfileParams> = (params) => {
  const dispatch = useAppDispatch();
  const submitQuestion = (question: string, anonymously: boolean) => {
    dispatch(addQuestion(question, params.username, anonymously));
  };
  return (
    <div className="relative w-full">
      {backgroundCover(params.coverImageUrl)}

      <div className="w-full absolute top-0 left-0">
        <Navbar />
        <div className="w-2/3 mx-auto text-gray-200">
          {profileBox(
            params.profileImageUrl,
            params.username,
            params.fullname,
            !params.status,
            params.guest,
            params.follow,
            () => {
              if (params.guest) {
                dispatch(
                  params.follow
                    ? unfollowUser(params.username)
                    : followUser(params.username)
                );
              } else {
                dispatch(changeStatus(!params.status));
              }
            }
          )}
          <div className="flex flex-row">
            <div className="w-2/3">
              <AskQuestionCard
                label={
                  params.guest ? `Ask @${params.username}` : "Ask yourself"
                }
                onSubmit={submitQuestion}
                showImage={!params.guest}
              />
              {questionTabBar}
              {params.answers?.map((answer) => (
                <AnswerCard key={answer.id} {...answer} />
              ))}
            </div>
            <div className="w-1/3  mx-8">
              <div className="grid grid-cols-2  h-fit">
                <ProfileStats
                  icon="💬"
                  label="Posts"
                  counter={params.postsCount}
                />
                <ProfileStats
                  icon="❤️"
                  label="Likes"
                  counter={params.likesCount}
                />
                {!params.guest && (
                  <ProfileStats
                    icon="😎"
                    label="followers"
                    counter={params.followersCount!}
                  />
                )}
              </div>
              {aboutMe(params.bio, params.links, params.location, params.guest)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileStatsParams {
  icon: string;
  label: string;
  counter: number;
}
const ProfileStats: FC<ProfileStatsParams> = (params) => {
  return (
    <div className="flex flex-row">
      <div className="rounded-full bg-themeblack h-fit my-auto p-2 text-center">
        <p className="py-auto text-xl">{params.icon}</p>
      </div>
      <div className="px-2">
        <p className="text-xl">{params.counter}</p>
        <p className="text-base text-gray-400">{params.label}</p>
      </div>
    </div>
  );
};

const backgroundCover = (img: string) => (
  <div
    className="object-cover w-full h-screen bg-no-repeat fixed bg-cover"
    style={{
      backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, .9),rgba(0,0,0,1)), url("http://localhost:8080/image/${img}")`,
    }}
  ></div>
);
const profileBox = (
  img: string,
  username: string,
  fullname: string,
  checked: boolean,
  guest?: boolean,
  follow?: boolean,
  onClick?: () => void
) => (
  <div className="py-16 flex flex-row">
    <div
      className="rounded-full bg-center w-24 h-24  my-auto border-4 border-gray-500 group-hover:border-white bg-cover"
      style={{
        backgroundImage: ` url("http://localhost:8080/image/${img}")`,
      }}
    />
    <div className="my-auto">
      <p className="px-4 text-xs">@{username}</p>
      <h2 className="px-4 py-2 font-extrabold text-3xl">{fullname}</h2>
      <div className="px-4 flex flex-row">
        <div className="flex flex-row justify-between cursor-pointer">
          {guest ? (
            <button
              className="text-white text-sm border-2 font-semibold border-white rounded-md px-4 my-auto mx-2 cursor-pointer p-1 hover:text-gray-900 hover:bg-white "
              onClick={onClick}
            >
              {!follow ? "Follow" : "Unfollow"}
            </button>
          ) : (
            <Fragment>
              <Switch checked={checked} onChange={onClick} />

              <p className="mx-4 text-gray-300 my-auto font-medium">
                invisible
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

const questionTabBar = (
  <div className="w-full rounded-md border border-white flex flex-row text-center my-4">
    <p className="font-medium flex-grow bg-white text-black cursor-pointer py-1">
      Answers
    </p>
    <p className="font-medium flex-grow cursor-pointer py-1">Questions</p>
  </div>
);

const aboutMe = (
  bio: string,
  links: string,
  location: string,
  guest: boolean
) => (
  <Fragment>
    <div className="flex flex-row justify-between py-8">
      <h4 className="text-sm font-semibold">About Me</h4>
      {!guest && (
        <Link to="/user/settings" className="text-accent text-xs my-auto">
          Edit Profile
        </Link>
      )}
    </div>
    <div className="flex flex-row">
      <BioIcon />
      <p className="pl-4">{bio}</p>
    </div>
    <div className="flex flex-row">
      {LocationIcon()}
      <p className="pl-4">{location}</p>
    </div>
    <div className="flex flex-row">
      {LinkIcon()}
      <p className="pl-4">{links}</p>
    </div>
    <div className="flex flex-row">
      {HashIcon()}
      <p className="pl-4">#nothing</p>
    </div>
  </Fragment>
);

export default UserProfile;
