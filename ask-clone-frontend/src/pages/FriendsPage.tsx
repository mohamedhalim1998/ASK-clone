import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import { Friend } from "../model/Friend";
import {
  getFriends,
  searchFriends,
  updateFriendsLoading,
} from "../store/FirendsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RightArrow, SearchIcon } from "../utils/Icons";
import Switch from "../components/Switch";
import { followUser } from "../store/ProfileReducer";
import { delay } from "lodash";
import LoadingIcons from "react-loading-icons";

interface FriendsPageState {
  friends: Friend[];
  searchAll: boolean;
  otherUsers: Friend[];
}

function FriendsPage() {
  const dispatch = useAppDispatch();
  const allFriends: Friend[] = useAppSelector((state) => state.friends.friends);
  const otherUsers: Friend[] = useAppSelector(
    (state) => state.friends.otherUsers
  );
  const loading = useAppSelector((state) => state.friends.loading);
  const initState: FriendsPageState = {
    friends: allFriends,
    searchAll: false,
    otherUsers: otherUsers,
  };
  const [state, setState] = useState<FriendsPageState>(initState);
  const setFriends = (friends: Friend[]) => {
    setState({ ...state, friends: [...friends] });
  };
  const setSearchAll = (searchAll: boolean) => {
    setState({ ...state, searchAll: searchAll });
  };

  useEffect(() => {
    dispatch(updateFriendsLoading(true));
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    setFriends(allFriends);
  }, [allFriends]);
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <LoadingIcons.Bars height={30} />
      </div>
    );
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
              if (state.searchAll) {
                dispatch(searchFriends(query));
              }
            }}
          />
          <div className="flex flex-row py-2">
            <Switch
              checked={state.searchAll}
              onChange={() => {
                setSearchAll(!state.searchAll);
              }}
            />
            <p className="pl-4 text-xs">Also search all users</p>
          </div>
          <h4 className="mt-5 mb-2 font-semibold text-sm">Your Friends</h4>

          {state.friends.map((f, index) => {
            return FriendCard(f, false);
          })}
          {state.searchAll && (
            <h4 className="mt-5 mb-2 font-semibold text-sm">other users</h4>
          )}
          {state.searchAll &&
            otherUsers.map((f, index) => {
              return FriendCard(f, true);
            })}
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
        className="border-none focus:outline-none text-base w-full"
      />
    </div>
  );
};

const FriendCard = (friend: Friend, otherUser?: boolean) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row w-full py-2">
      <Link to={`/user/${friend.username}`}>
        {ProfileImage(friend.profilePic)}
      </Link>
      <div className="flex flex-col text-sm px-2">
        <Link to={`/user/${friend.username}`}>
          <p className="font-semibold">{friend.fullname}</p>
        </Link>
        <Link to={`/user/${friend.username}`}>
          <p className="text-gray-500">{friend.username}</p>
        </Link>
      </div>
      <div className="flex flex-row  h-fit my-auto ml-auto">
        {otherUser && (
          <Link
            className="flex flex-row border-2 border-themeblack rounded-md hover:text-white hover:bg-themeblack mx-2 pl-2 pr-1 py-1 cursor-pointer"
            to={`/user/${friend.username}/ask`}
          >
            <p className="py-auto text-sm font-semibold">Follow</p>
            <RightArrow />
          </Link>
        )}

        <div
          className="flex flex-row border-2 border-themeblack rounded-md hover:text-white hover:bg-themeblack mx-2 pl-2 pr-1 py-1 cursor-pointer"
          onClick={() => {
            dispatch(followUser(friend.username));
          }}
        >
          <p className="py-auto text-sm font-semibold">Ask</p>
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
