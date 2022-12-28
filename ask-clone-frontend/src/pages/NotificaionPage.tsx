import React, { FC, useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import { Notification } from "../model/Notification";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getNotifications,
  markAllAsRead,
  updateLoadMoreNotifications,
} from "../store/NotificationReducer";
import { formatDate } from "../utils/DateFormat";

const NotificaionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications: Notification[] = useAppSelector(
    (state) => state.notification.notifications
  );
  const loadMore: boolean = useAppSelector(
    (state) => state.notification.loadMore
  );
  const onScroll = (e: Event) => {
    const max =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const inBottom = window.scrollY >= max - 10;
    const page = notifications.length / 20;
    if (inBottom && !loadMore) {
      dispatch(updateLoadMoreNotifications(true));
      dispatch(getNotifications(page));
    }
  };
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(markAllAsRead());
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore, notifications]);
  console.log(notifications);
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="bg-white rounded-md w-2/3 text-gray-900 px-4 py-4">
          <div className="flex flex-row py-2 justify-between">
            <h3 className="text-xl font-semibold">Notification</h3>
          </div>
          <div>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} {...notification} />
          ))}
            {loadMore && (
                  <div className="w-full h-fit flex flex-col justify-center items-center">
                    <LoadingIcons.Bars height={30} />
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};
const NotificationCard: FC<Notification> = (params) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex felx-row">
        {ProfileImage(params.fromProfileImage)}
        <div className="px-2">
          <div>
            {`You received a ${params.type.toLocaleLowerCase()} `}
            {params.from && (
              <div className="inline">
                <p className="inline">from </p>
                <Link
                  to={`/user/${params.from}`}
                  className="text-gray-800 font-bold text-sm py-.5"
                >
                  {params.fromFullName}
                </Link>
              </div>
            )}
            <p className="inline"> : </p>
            <Link
              to={`${
                params.questionId
                  ? "/user/question/".concat(params.questionId.toString())
                  : "/answer/".concat(params.answerId!.toString())
              } `}
              className="text-gray-800 font-bold text-base py-.5"
            >
              {params.questionText}
            </Link>
          </div>

          <p className="text-gray-400 text-xs">{formatDate(params.date!)}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificaionPage;
