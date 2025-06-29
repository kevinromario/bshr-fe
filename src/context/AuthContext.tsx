import React from "react";
import { AUTH_TOKEN_KEY } from "src/constants";
import { getUserById } from "src/services/user.service";
import type { User } from "src/types/user";
import { isTokenValid, parseJwt } from "src/utils/auth";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
  authStateLoaded: boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStateLoaded, setAuthStateLoaded] = React.useState(false);
  const [user, setUserState] = React.useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUserState(null);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (token && isTokenValid()) {
        const payload = parseJwt(token);
        if (payload?.sub) {
          try {
            const user = await getUserById(payload.sub);
            setUser(user);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            logout();
          }
        }
      } else {
        logout();
      }

      setAuthStateLoaded(true);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, clearUser, logout, authStateLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
