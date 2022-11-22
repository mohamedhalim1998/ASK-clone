import { delay } from "lodash";
import React, { useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { Link, useParams } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import { FeedState, getAnswer, updateFeedLoading } from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function AnswerPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const feed: FeedState = useAppSelector((state) => state.feed);
  // width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;
  useEffect(() => {
    dispatch(updateFeedLoading(true));
    dispatch(getAnswer(+id!));
  }, []);
  if (feed.loading)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <LoadingIcons.Bars height={30} />
      </div>
    );
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="rounded-md w-2/3 px-4 py-4">
          {feed.answers.map((a) => (
            <div>
              <AnswerCard answer={a} showProfile />
              <div>
                <p className="py-4 text-white">❤️ Likes</p>
                <div className="flex flex-row">
                  {a.likes.map((l) => (
                    <Link to={`/user/${l.username}`}>
                      {" "}
                      {ProfileImage(l.profileImage)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnswerPage;
