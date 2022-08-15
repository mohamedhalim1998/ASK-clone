import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import DropDownMenu from "./DropDownMenu";
import EmojiIcon from "./EmojiIcon";
import { MenuItemParams } from "./MenuItem";

const Navbar: React.FC = () => {
  return (
    <div className=" bg-themeblack w-full text-white">
      <div className="flex flex-row justify-between w-2/4 mx-auto">
        <img src={logo} alt="logo" className="w-20 h-fit py-4" />
        <div className="flex flex-row py-2">
          {BarIcons}
          {ProfileIcon()}
          {AskQuestionMenu()}
        </div>
      </div>
    </div>
  );
};
const PlusIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    ></path>
  </svg>
);

const BarIcons = (
  <Fragment>
    <EmojiIcon icon="👁️" label="Home" path="/" />

    <EmojiIcon
      icon="💌"
      label="Inbox"
      path="/user/inbox"
      withBadge={true}
      badgeCounter={5}
    />
    <EmojiIcon
      icon="⚡"
      label="Notifications"
      path="/user/notifications"
      badgeCounter={100}
      withBadge={true}
    />
    <EmojiIcon icon="😎" label="Friends" path="/user/friends" />
  </Fragment>
);
const DownArrowIcon = (onClick: () => void) => {
  return (
    <svg
      className="w-3 h-3 my-auto cursor-pointer"
      fill="none"
      stroke="#EB3D43"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
};

const ProfileIcon = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuItems: MenuItemParams[] = [
    { name: "Settings", url: "/user/settings" },
    { name: "Logout" },
  ];
  console.log(menuItems);
  return (
    <div className="relative my-auto">
      <div className="flex flex-row mx-2">
        <Link to="/user/profile" className="flex flex-row group">
          <img
            src="https://cuad.ask.fm/3c8/35d77/5630/4fad/b7c3/eff86398c263/normal/116045.jpg"
            alt=""
            className="rounded-full bg-center w-7 h-7  my-auto border-2 border-gray-500 group-hover:border-white"
          />
          <p className="my-auto mx-2 text-xs font-semibold">MH</p>
        </Link>
        {DownArrowIcon(() => setShowProfileMenu(!showProfileMenu))}
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
