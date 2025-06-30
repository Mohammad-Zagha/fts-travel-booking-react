import type { JSX } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const HomeRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userInfo, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (isAuthenticated && userInfo?.userType === "Admin") {
    return <Navigate to="/admin" replace />;
  }

  // unauthenticated OR user type
  return children;
};

export default HomeRoute;
