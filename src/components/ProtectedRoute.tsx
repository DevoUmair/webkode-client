import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Hooks/UseAuth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'user')[];
}
interface User{
  id:string,
  name:string,
  role:'admin' | 'user',
  email:string
}
export default function ProtectedRoute({ allowedRoles }:ProtectedRouteProps) {
  const { isAuthenticated, isSubscribed, user} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; 
  }
 

  useEffect(()=>{
    console.log("User in protected routes",user)
  },[])

  if (!isSubscribed) {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
}