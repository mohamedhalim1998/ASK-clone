import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { Profile } from "../model/Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProfileInfo, updateProfileLoading } from "../store/ProfileReducer";

function GuestProfile() {
  const { username } = useParams();
  const dispatch = useAppDispatch();

  const profile: Profile = useAppSelector((state) => state.profile.profile);
  const guest: Profile = useAppSelector((state) => state.profile.guest);
  const loading: boolean = useAppSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(updateProfileLoading(true));
    dispatch(getProfileInfo(username!));
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  console.log(username);
  console.log(profile.username);
  return <UserProfile {...guest} guest={username !== profile.username} />;
}

export default GuestProfile;
