import { useEffect } from "react";
import { Navigate } from "react-router";
import { Outlet, useLocation } from "react-router-dom";
import { updateAuthLoading, verifyToken } from "../store/AuthReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/Store";

const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();

  const verified = useAppSelector((state: RootState) => state.auth.verified);
  const loading = useAppSelector((state) => state.auth.loading);
  const location = useLocation();
  console.log("auth: S" + verified);
  useEffect(() => {
    if (!verified) {
      dispatch(updateAuthLoading(true));
      dispatch(verifyToken());
    }
  }, []);
  if (loading || verified === undefined) {
    return <div>loading...</div>;
  }
  return verified === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default ProtectedRoute;
