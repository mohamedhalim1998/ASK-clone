import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import {
  getGuestInfo,
  GuestState,
  updateGuestLoading,
} from "../store/GuestReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function GuestProfile() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const state: GuestState = useAppSelector((state) => state.guest);
  const loading: boolean = useAppSelector((state) => state.guest.loading);
  useEffect(() => {
    dispatch(updateGuestLoading(true));
    dispatch(getGuestInfo(username!));
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  return <UserProfile {...state} guest={true} />;
}

export default GuestProfile;
