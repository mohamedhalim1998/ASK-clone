import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";
import { logout } from "../store/AuthReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ProfileState } from "../store/ProfileReducer";
import { DownArrowIcon, PlusIcon } from "../utils/Icons";
import DropDownMenu, { MenuItemParams } from "./DropDownMenu";
import EmojiIcon from "./EmojiIcon";

const Navbar: React.FC = () => {
  const profile: ProfileState = useAppSelector((state) => state.profile);
  return (
    <div className=" bg-themeblack w-full text-white">
      <div className="flex flex-row justify-between w-2/3 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-20 h-fit py-4" />
        </Link>
        <div className="flex flex-row py-2">
          {BarIcons}
          {ProfileIcon(profile.profileImageUrl, profile.fullname)}
          {AskQuestionMenu()}
        </div>
      </div>
    </div>
  );
};

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
