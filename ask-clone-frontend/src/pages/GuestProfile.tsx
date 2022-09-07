import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import {
  getGuestInfo,
  GuestState,
  updateGuestLoading,
} from "../store/GuestReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ProfileState } from "../store/ProfileReducer";

function GuestProfile() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const state: GuestState = useAppSelector((state) => state.guest);
  const profileState: ProfileState = useAppSelector((state) => state.profile);
  const loading: boolean = useAppSelector((state) => state.guest.loading);

  useEffect(() => {
    dispatch(updateGuestLoading(true));
    dispatch(getGuestInfo(username!));
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  console.log(username);
  console.log(profileState.username);
  return <UserProfile {...state} guest={username !== profileState.username} />;
}

export default GuestProfile;
