import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};

type FinteckHqContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create context with default (undefined for safety)
const FinteckHqContext = createContext<FinteckHqContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

function FintechContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <FinteckHqContext.Provider value={{ user, setUser }}>
      {children}
    </FinteckHqContext.Provider>
  );
}

// Custom hook with safety check
export const useFinteckHqContext = () => {
  const context = useContext(FinteckHqContext);
  if (context === undefined) {
    throw new Error('useFinteckHqContext must be used within a FintechContextProvider');
  }
  return context;
};

export default FintechContextProvider;
