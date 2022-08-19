import { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getProfileInfo,
  ProfileState,
  updateProfileLoading,
} from "../store/ProfileReducer";

function Profile() {
  const dispatch = useAppDispatch();
  const profileState: ProfileState = useAppSelector((state) => state.profile);
  const loading: boolean = useAppSelector((state) => state.profile.loading);
  useEffect(() => {
    dispatch(updateProfileLoading(true));
    dispatch(getProfileInfo());
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  return <UserProfile {...profileState} guest={false} />;
}

export default Profile;
