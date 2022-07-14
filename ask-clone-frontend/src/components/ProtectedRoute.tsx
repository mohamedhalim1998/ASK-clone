import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute: React.FC<{ child: JSX.Element }> = (param) => {
  const isAuthenticated = Cookies.get("isAuthenticated");

  return isAuthenticated === "true" ? (
    param.child
  ) : (
    <Navigate replace to="/login" />
  );
};
export default ProtectedRoute;
