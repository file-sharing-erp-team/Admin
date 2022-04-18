import React from "react";

export interface IAuthContext {
  token: string | null;
  userId: number | null;
  login: (
    jwtToken: string,
    refreshToken: string,
    id: number,
    rememberMe: boolean
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<IAuthContext>({
  token: null,
  userId: null,
  login: (
    jwtToken: string,
    refreshToken: string,
    id: number,
    rememberMe: boolean
  ) => {},
  logout: () => {},
  isAuthenticated: false,
});
