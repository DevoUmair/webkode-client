import finteckApi from "@/axios/Axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type Role = "admin" | "developer";
type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isSubscribed: boolean;
  isAuthenticated: boolean;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  fetchUser: () => Promise<void>;
};
// Create context with default (undefined for safety)
const UserContext = createContext<UserContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

function UserContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = async () => {
    try {
      await finteckApi.post("/api/user/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };
  const hasFetchedRef = useRef(false);

  const fetchUser = async () => {
    try {
      const res = await finteckApi.get("/user/token/refresh");
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
      setAccessToken(null);
    }
  };
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        accessToken,
        setAccessToken,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("userContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
