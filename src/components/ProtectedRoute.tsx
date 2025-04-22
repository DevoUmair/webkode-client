import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "@/context/UserContextProvider";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "developer")[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useUser();

  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  useEffect(() => {
    console.log("User in protected routes", user);
  }, [user]);

  if (user && !user.isSubscribed) {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
}
