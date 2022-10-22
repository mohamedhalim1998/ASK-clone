import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import { Friend } from "../model/Friend";
import { getFriends } from "../store/FirendsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RightArrow, SearchIcon } from "../utils/Icons";

function FriendsPage() {
  const dispatch = useAppDispatch();
  const allFriends: Friend[] = useAppSelector((state) => state.friends.friends);
  const [friends, setFriends] = useState<Friend[]>(allFriends);
  const loading = useAppSelector((state) => state.friends.loading);
  useEffect(() => {
    console.log("get friends");
    dispatch(getFriends());
  }, [loading]);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="bg-white rounded-md w-2/3 text-gray-900 px-4 py-4">
          <SearchInput
            onChange={(query: string) => {
              console.log("search friends");

              setFriends(
                query.length !== 0
                  ? [
                      ...allFriends.filter((friend) =>
                        friend.username.includes(query)
                      ),
                    ]
                  : [...allFriends]
              );
            }}
          />
          <h4 className="mt-10 mb-2 font-semibold text-sm">Your Friends</h4>

          {friends.map((f, index) => (
            <FriendCard {...f} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
const SearchInput = (params: { onChange: (query: string) => void }) => {
  const [query, setQuery] = useState<string>("");
  return (
    <div className="w-full flex flex-row border rounded-sm py-2">
      <SearchIcon />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          console.log("onchange");
          params.onChange(e.target.value);
        }}
        type="text"
        placeholder="Search People "
        className="border-none focus:outline-none text-base"
      />
    </div>
  );
};

const FriendCard = (friend: Friend) => {
  return (
    <div className="flex flex-row w-full py-2">
      {ProfileImage(friend.profilePic)}
      <div className="flex flex-col text-sm px-2">
        <p className="font-semibold">{friend.fullname}</p>
        <p className="text-gray-500">{friend.username}</p>
      </div>
      <Link
        className="flex flex-row border-2 border-themeblack rounded-md hover:text-white hover:bg-themeblack h-fit my-auto ml-auto pl-2 pr-1 py-1 cursor-pointer"
        to={`/user/${friend.username}/ask`}
      >
        <p className="py-auto text-sm font-semibold">Ask</p>
        <RightArrow />
      </Link>
    </div>
  );
};

export default FriendsPage;
