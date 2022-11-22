import React, { useEffect, useState } from "react";
import { Friend } from "../model/Friend";
import { getFriends, updateFriendsLoading } from "../store/FirendsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Checkbox from "./Checkbox";
import ProfileImage from "./ProfileImage";
import SendButton from "./SendButton";

function FriendsModal(params: { onSubmit: (to: string[]) => void }) {
  const dispatch = useAppDispatch();

  const friends: Friend[] = useAppSelector((state) => state.friends.friends);
  const [friendsCheck, setFriendsCheck] = useState<boolean[]>(
    friends.map((f) => false)
  );
  useEffect(() => {
    dispatch(updateFriendsLoading(true));
    dispatch(getFriends());
  }, []);
  useEffect(() => {
    setFriendsCheck(friends.map((f) => false));
  }, [friends]);
  const checkFriend = (index: number) => {
    const newFriendsCheck = [...friendsCheck];
    newFriendsCheck[index] = !newFriendsCheck[index];
    console.log("check friend : " + index);
    setFriendsCheck(newFriendsCheck);
  };
  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="w-1/3 bg-themeblack mx-auto my-4 opacity-100 p-4 rounded-md">
        {friends.map((f, index) => {
          return FriendCard(index, f, friendsCheck[index], checkFriend);
        })}
        <div className="flex flex-row w-full">
          {SendButton(() => {
            const to: string[] = friends
              .filter((f, index) => friendsCheck[index])
              .map((f) => f.username);
            params.onSubmit(to);
          })}
        </div>
      </div>
    </div>
  );
}
const FriendCard = (
  index: number,
  friend: Friend,
  checked?: boolean,
  onClick?: (index: number) => void
) => {
  return (
    <div
      className="flex flex-row"
      onClick={() => {
        if (onClick) onClick(index);
      }}
    >
      <div className="px-2 my-auto h-full">
        <Checkbox isChecked={checked} label={""} />
      </div>
      <div className="flex flex-row w-full py-2">
        {ProfileImage(friend.profilePic)}
        <div className="flex flex-col text-sm px-2">
          <p className="font-semibold">{friend.fullname}</p>
          <p className="text-gray-500">{friend.username}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
