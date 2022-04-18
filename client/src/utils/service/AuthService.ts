import http from "./http-common";
import { UserData, ILoginData } from "../types/types";

const logIn = (data: ILoginData) => {
  return http.post<UserData>("/auth/login", data);
};

const refresh = () => {
  return http.get<UserData>("/auth/refresh", { withCredentials: true });
};

const AuthService = { logIn, refresh };

export default AuthService;
