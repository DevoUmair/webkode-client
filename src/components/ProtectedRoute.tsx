// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth'; 
import { useAuth } from './Hooks/UseAuth';
// You'll need to create this hook

export default function ProtectedRoute() {
  const { isAuthenticated, isSubscribed } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isSubscribed) {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
}