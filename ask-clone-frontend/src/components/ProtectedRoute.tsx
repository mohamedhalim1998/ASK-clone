import { Navigate } from "react-router";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/Store";

const ProtectedRoute: React.FC<{ child: JSX.Element }> = (param) => {
  const verified = useAppSelector((state: RootState) => state.auth.verified);

  return verified === true ? param.child : <Navigate replace to="/login" />;
};
export default ProtectedRoute;
