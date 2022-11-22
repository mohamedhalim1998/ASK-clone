import { useEffect, useState } from "react";
import AnswerCard from "../components/AnswerCard";
import AskQuestionCard from "../components/AskQuestionCard";
import FriendsModal from "../components/FriendsModal";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import { Profile } from "../model/Profile";
import {
  FeedState,
  getFeedAnswers,
  updateFeedLoading,
} from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuestionToListUsers } from "../store/InboxReduer";
import { hideFriendsLike, showFriendsLike } from "../store/ProfileReducer";
import Question from "./QuestionPage";
interface ModalParams {
  show: boolean;
  question: string;
  anonymously: boolean;
}
const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const feed: FeedState = useAppSelector((state) => state.feed);
  const profile: Profile = useAppSelector((state) => state.profile.profile);
  const [modalState, setModalState] = useState<ModalParams>({
    show: false,
    question: "",
    anonymously: false,
  });
  console.log("show Likes: " + profile.showFriendsLikes);

  useEffect(() => {
    dispatch(updateFeedLoading(true));
    dispatch(getFeedAnswers());
  }, []);
  if (feed.loading) {
    return <div>loading</div>;
  }
  return (
    <div className="mx-auto text-white">
      <Navbar />
      <div className="relative">
        {modalState.show && (
          <div className="w-full h-screen absolute top-0 left-0">
            <div
              className="absolute bg-white top-0 left-0 w-full h-screen opacity-30"
              //   onClick={() => {
              //     setModalState({
              //       show: false,
              //       question: modalState.question,
              //       anonymously: modalState.anonymously,
              //     });
              //   }}
            ></div>
            <FriendsModal
              onSubmit={(to: string[]) => {
                dispatch(
                  addQuestionToListUsers(
                    modalState.question,
                    to,
                    modalState.anonymously
                  )
                );
                setModalState({
                  show: false,
                  question: modalState.question,
                  anonymously: modalState.anonymously,
                });
              }}
            />
          </div>
        )}

        <div className="w-2/3 mx-auto">
          <div className="grid grid-cols-3 ">
            <div className="col-span-2 ">
              <AskQuestionCard
                label="👋Ask people"
                allowAnonymously
                onSubmit={(question: string, anonymously: boolean) => {
                  setModalState({
                    show: true,
                    question,
                    anonymously,
                  });
                }}
              />
              <div
                className="flex flex-row py-4 cursor-pointer"
                onClick={() => {
                  console.log("show Likes: " + profile.showFriendsLikes);
                  console.log(profile);
                  if (profile.showFriendsLikes) {
                    dispatch(hideFriendsLike());
                  } else {
                    dispatch(showFriendsLike());
                  }
                  dispatch(getFeedAnswers());
                }}
              >
                <Switch checked={profile.showFriendsLikes} />
                <p className="pl-4 text-xs text-gray-300">
                  Also show answers my friends like
                </p>
              </div>
              {feed.answers.map((a) => (
                <AnswerCard answer={a} showProfile />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
