import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "@/context/UserContextProvider";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "developer")[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useUser();
  console.log("USER", user);
  console.log("ISLOading", isLoading);

  if (!isLoading) {
    console.log("USER", user);

    if (!user || !user.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    // useEffect(() => {
    //   console.log("User in protected routes", user);
    // }, [user]);

    if (user && !user.isSubscribed) {
      return <Navigate to="/pricing" replace />;
    }
  }

  return <Outlet />;
}
