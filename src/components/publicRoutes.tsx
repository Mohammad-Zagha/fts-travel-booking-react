import type { JSX } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />; // redirect to main page if logged in
  }

  return children;
};

export default PublicRoute;
