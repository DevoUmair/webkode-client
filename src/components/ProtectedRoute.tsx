import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContextProvider";
import { useEffect, useState  , useRef } from "react";
import LoadingBar from 'react-top-loading-bar';

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "developer")[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const ref = useRef(null);

  console.log(user);

  useEffect(() => {
    if (!isLoading && user) {
      console.log(user?.role);
      setIsAuthenticated(user.isAuthenticated);
      if (user.isAuthenticated) {
        ref.current?.complete();
      } else {
        ref.current?.start();
      }
    }
  }, [user, isLoading]);

  if (isLoading || isAuthenticated === null) {
    return (
      <div style={{height:'100vh' ,  display:'flex', justifyContent:'center' , alignItems:'center'}} >
         <div style={{width:'100%'}} >
          <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
            <div>Loading...</div>
         </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
