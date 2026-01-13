import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProtectedRoute() {
  const userToken = useSelector((state) => state.userAuth.token);

  return userToken ? <Outlet /> : <Navigate to="/UserLogin" replace />;
}

export default UserProtectedRoute;
