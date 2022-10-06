import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import { Notification } from "../model/Notification";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllNotification,
  markAllAsRead,
} from "../store/NotificationReducer";
import { formatDate } from "../utils/DateFormat";

const NotificaionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications: Notification[] = useAppSelector(
    (state) => state.notification.notifications
  );
  useEffect(() => {
    dispatch(getAllNotification());
    dispatch(markAllAsRead());
  }, []);
  console.log(notifications);
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="bg-white rounded-md w-2/3 text-gray-900 px-4 py-4">
          <div className="flex flex-row py-2 justify-between">
            <h3 className="text-xl font-semibold">Notification</h3>
          </div>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} {...notification} />
          ))}
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
              to={`/${params.type === "QUESTION" ? "question" : "answer"} /${
                params.questionId
              }`}
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
