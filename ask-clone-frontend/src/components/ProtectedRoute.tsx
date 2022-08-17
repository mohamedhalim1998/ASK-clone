import { Navigate } from "react-router";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/Store";

const ProtectedRoute: React.FC = () => {
  const verified = useAppSelector((state: RootState) => state.auth.verified);
  const location = useLocation();
  return verified === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default ProtectedRoute;
