import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";
import { Profile } from "../model/Profile";
import { logout } from "../store/AuthReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { DownArrowIcon, PlusIcon } from "../utils/Icons";
import DropDownMenu, { MenuItemParams } from "./DropDownMenu";
import EmojiIcon from "./EmojiIcon";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getProfileInfo } from "../store/ProfileReducer";
import { addNotification } from "../store/NotificationReducer";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading: boolean = useAppSelector((state) => state.profile.loading);
  const profile: Profile = useAppSelector((state) => state.profile.profile);
  // useEffect(() => {
  //   dispatch(getProfileInfo());
  // }, []);
  const [notificationCounter, setNotificationCounter] = useState<number>(
    profile.unReadNotifications
  );
  if (loading) {
    return <div>loading</div>;
  }
  var sock = new SockJS("http://localhost:8080/ws");
  let stompClient = Stomp.over(sock);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe(
      `/user/${profile.username}/notification`,
      function (message) {
        console.log("question is comming");
        console.log(message);
        //  dispatch(addNotification(JSON.parse(message.body) as Notification));
        setNotificationCounter(notificationCounter + 1);
      }
    );
  });

  return (
    <div className=" bg-themeblack w-full text-white">
      <div className="flex flex-row justify-between w-2/3 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-20 h-fit py-4" />
        </Link>
        <div className="flex flex-row py-2">
          {BarIcons(notificationCounter)}
          {ProfileIcon(profile.profileImageUrl, profile.fullname)}
          {AskQuestionMenu()}
        </div>
      </div>
    </div>
  );
};

const BarIcons = (notificationCounter: number) => (
  <Fragment>
    <EmojiIcon icon="👁️" label="Home" path="/" />

    <EmojiIcon icon="💌" label="Inbox" path="/user/inbox" />
    <EmojiIcon
      icon="⚡"
      label="Notifications"
      path="/user/notifications"
      badgeCounter={notificationCounter}
      withBadge={true}
    />
    <EmojiIcon icon="😎" label="Friends" path="/user/friends" />
  </Fragment>
);

const ProfileIcon = (img: string, name: string) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const menuItems: MenuItemParams[] = [
    { name: "Settings", url: "/user/settings" },
    {
      name: "Logout",
      action: () => {
        dispatch(logout());
      },
    },
  ];

  console.log(menuItems);
  return (
    <div className="relative my-auto">
      <div className="flex flex-row mx-2">
        <Link to="/user/profile" className="flex flex-row group">
          <div
            className={`rounded-full bg-center bg-cover w-7 h-7  my-auto border-2 group-hover:border-white ${
              location.pathname === "/user/profile"
                ? "border-accent"
                : "border-gray-500"
            }`}
            style={{
              backgroundImage: ` url("http://localhost:8080/image/${img}")`,
            }}
          />
          <p className="my-auto mx-2 text-xs font-semibold">{name}</p>
        </Link>
        <DownArrowIcon onClick={() => setShowProfileMenu(!showProfileMenu)} />
      </div>
      <DropDownMenu show={showProfileMenu} items={menuItems} />
    </div>
  );
};
const AskQuestionMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuItems: MenuItemParams[] = [
    { name: "Ask people", icon: "👋" },
    { name: "Ask Friend", icon: "❓" },
  ];
  return (
    <div className="relative my-auto">
      <div
        className="py-1 px-2 my-auto mx-auto rounded-md bg-accent hover:bg-accentdark cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        {PlusIcon}
      </div>
      <DropDownMenu
        show={showMenu}
        items={menuItems}
        background="#090B0C"
        width="10rem"
      />
    </div>
  );
};

export default Navbar;
