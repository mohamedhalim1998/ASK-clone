import { useEffect } from "react";
import AnswerCard from "../components/AnswerCard";
import AskQuestionCard from "../components/AskQuestionCard";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import {
  FeedState,
  getFeedAnswers,
  updateFeedLoading,
} from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const feed: FeedState = useAppSelector((state) => state.feed);

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
      <div className="w-2/3 mx-auto">
        <div className="grid grid-cols-3 ">
          <div className="col-span-2 ">
            <AskQuestionCard label="👋Ask people" />
            <div className="flex flex-row py-4">
              <Switch />
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
  );
};
export default Main;
