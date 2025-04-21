// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { getAccessToken } from '@/lib/auth';

export function useAuth() {
  const [authState, setAuthState] = useState({
    isAuthenticated: true,
    isSubscribed: true,
    isLoading: true,
    user: null,
  });

//   useEffect(() => {
//     const checkAuth = async () => {
//    
//       const token = localStorage.getItem("token")
      
//       if (!token) {
//         setAuthState({
//           isAuthenticated: false,
//           isSubscribed: false,
//           isLoading: false,
//           user: null,
//         });
//         return;
//       }

//       try {
//         // const decoded = jwtDecode(token);
//         const decoded=JSON.parse(localStorage.getItem('user')!)
//         const isSubscribed = decoded.subscriptionStatus === 'active';
        
//         setAuthState({
//           isAuthenticated: true,
//           isSubscribed,
//           isLoading: false,
//           user: decoded,
//         });
//       } catch (error) {
//         localStorage.removeItem('accessToken');
//         setAuthState({
//           isAuthenticated: false,
//           isSubscribed: false,
//           isLoading: false,
//           user: null,
//         });
//       }
//     };

//     checkAuth();
//   }, []);

  return {
    ...authState,
  };
}