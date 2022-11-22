import { Fragment, useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { Link, useParams } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import AskQuestionCard from "../components/AskQuestionCard";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import { Answer } from "../model/Answer";
import { Profile } from "../model/Profile";
import Question from "../model/Question";
import { getUserAnswers } from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuestion } from "../store/InboxReduer";
import {
  changeStatus,
  followUser,
  getProfileInfo,
  unfollowUser,
  updateProfileLoading,
} from "../store/ProfileReducer";
import { BioIcon, HashIcon, LinkIcon, LocationIcon } from "../utils/Icons";

function ProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const profile: Profile = useAppSelector((state) => state.profile.profile);
  const guest: Profile = useAppSelector((state) => state.profile.guest);
  const loading: boolean = useAppSelector((state) => state.profile.loading);
  const feed: Answer[] = useAppSelector((state) => state.feed.answers);
  useEffect(() => {
    dispatch(updateProfileLoading(true));
    dispatch(getProfileInfo(username));
  }, []);

  const state: Profile =
    username && username !== profile.username ? guest : profile;
  console.log(username);
  console.log(state);
  useEffect(() => {
    if (state.username !== "") dispatch(getUserAnswers(state.username));
  }, [state]);
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <LoadingIcons.Bars height={30} />
      </div>
    );
  }
  const submitQuestion = (question: string, anonymously: boolean) => {
    dispatch(addQuestion(question, state.username, anonymously));
  };
  return (
    <div className="relative w-full">
      {backgroundCover(state.coverImageUrl)}

      <div className="w-full absolute top-0 left-0">
        <Navbar />
        <div className="w-2/3 mx-auto text-gray-200">
          {profileBox(
            state.profileImageUrl,
            state.username,
            state.fullname,
            !state.status,
            state.guest,
            state.follow,
            () => {
              if (state.guest) {
                dispatch(
                  state.follow
                    ? unfollowUser(state.username)
                    : followUser(state.username)
                );
              } else {
                dispatch(changeStatus(!state.status));
              }
            }
          )}
          <div className="flex flex-row">
            <div className="w-2/3">
              <AskQuestionCard
                label={state.guest ? `Ask @${state.username}` : "Ask yourself"}
                onSubmit={submitQuestion}
                allowAnonymously={state.allowAnoymousQuestions}
              />
              {questionTabBar}
              {feed.map((answer) => (
                <AnswerCard key={answer.id} answer={answer} />
              ))}
            </div>
            <div className="w-1/3  mx-8">
              <div className="grid grid-cols-2  h-fit">
                <ProfileStats
                  icon="💬"
                  label="Posts"
                  counter={state.postsCount}
                />
                <ProfileStats
                  icon="❤️"
                  label="Likes"
                  counter={state.likesCount}
                />
                {!state.guest && (
                  <ProfileStats
                    icon="😎"
                    label="followers"
                    counter={state.followersCount!}
                  />
                )}
              </div>
              {aboutMe(state.bio, state.links, state.location, state.guest)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStats(state: { icon: string; label: string; counter: number }) {
  return (
    <div className="flex flex-row">
      <div className="rounded-full bg-themeblack h-fit my-auto p-2 text-center">
        <p className="py-auto text-xl">{state.icon}</p>
      </div>
      <div className="px-2">
        <p className="text-xl">{state.counter}</p>
        <p className="text-base text-gray-400">{state.label}</p>
      </div>
    </div>
  );
}

const backgroundCover = (img: string) => (
  <div
    className="object-cover w-full h-screen bg-no-repeat fixed bg-cover"
    style={{
      backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, .5),rgba(0,0,0,1)), url("http://localhost:8080/image/${img}")`,
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

export default ProfilePage;
