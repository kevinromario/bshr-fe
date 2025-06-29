import React from "react";
import type { User } from "src/types/user";

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = React.useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
