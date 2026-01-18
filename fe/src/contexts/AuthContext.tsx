import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface AuthContextType {
  userId: number | null;
  username: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userId: number, username: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedUserId) setUserId(Number(storedUserId));
    if (storedUsername) setUsername(storedUsername);
    if (storedToken) setToken(storedToken);
    
    setIsLoading(false);
  }, []);

  const login = (userId: number, username: string, token: string) => {
    localStorage.setItem("userId", String(userId));
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    setUserId(userId);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    setUserId(null);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        token,
        isLoggedIn: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};