import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "../types/AuthContextType";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem("username")
  );

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const login = (username: string, token: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setToken(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      username,
      token,
      isLoggedIn: Boolean(token),
      login,
      logout,
    }),
    [username, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
