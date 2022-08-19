import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../store/GuestReducer";
import { useAppDispatch } from "../store/hooks";
import { changeStatus } from "../store/ProfileReducer";
import AnswerCard from "./AnswerCard";
import AskQuestionCard from "./AskQuestionCard";
import Navbar from "./Navbar";
import Switch from "./Switch";

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
}

const UserProfile: FC<UserProfileParams> = (params) => {
  const dispatch = useAppDispatch();
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
                showImage={!params.guest}
              />
              {questionTabBar}
              <AnswerCard />
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
                {!params.guest && params.followersCount && (
                  <ProfileStats
                    icon="😎"
                    label="followers"
                    counter={params.followersCount}
                  />
                )}
              </div>
              {aboutMe(params.bio, params.links, params.location)}
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

const aboutMe = (bio: string, links: string, location: string) => (
  <Fragment>
    <div className="flex flex-row justify-between py-8">
      <h4 className="text-sm font-semibold">About Me</h4>
      <Link to="/user/settings" className="text-accent text-xs my-auto">
        Edit Profile
      </Link>
    </div>
    <div className="flex flex-row">
      <svg
        className="w-5 h-5"
        fill="#898B8C"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      <p className="pl-4">{bio}</p>
    </div>
    <div className="flex flex-row">
      <svg
        className="w-5 h-5"
        fill="#898B8C"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      <p className="pl-4">{location}</p>
    </div>
    <div className="flex flex-row">
      <svg
        className="w-5 h-5"
        fill="#898B8C"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clipRule="evenodd"
        />
      </svg>
      <p className="pl-4">{links}</p>
    </div>
    <div className="flex flex-row">
      <svg
        className="w-5 h-5"
        fill="#898B8C"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
          clipRule="evenodd"
        />
      </svg>
      <p className="pl-4">#nothing</p>
    </div>
  </Fragment>
);

export default UserProfile;
