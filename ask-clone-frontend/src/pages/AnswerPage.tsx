import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import Navbar from "../components/Navbar";
import { FeedState, getAnswer, updateFeedLoading } from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function AnswerPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const feed: FeedState = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(updateFeedLoading(true));
    dispatch(getAnswer(+id!));
  }, []);
  if (feed.loading) return <div>loading</div>;
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="rounded-md w-2/3 px-4 py-4">
          {feed.answers.map((a) => (
            <AnswerCard answer={a} showProfile />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnswerPage;
