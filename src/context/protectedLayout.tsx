import { Navigate, Outlet } from "react-router";
import { useAuth } from "./authContext";
import type { UserType } from "../types";

const ProtectedLayout = ({ requiredRole }: { requiredRole?: UserType }) => {
  const { isAuthenticated, userInfo, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  console.log(userInfo);
  if (requiredRole && userInfo?.userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
