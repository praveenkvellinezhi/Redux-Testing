import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoute() {
  const adminToken = useSelector((state) => state.auth.token); 
  // OR localStorage.getItem("token") if admin slice is different

  return adminToken ? <Outlet /> : <Navigate to="/" replace />;
}

export default AdminProtectedRoute;
