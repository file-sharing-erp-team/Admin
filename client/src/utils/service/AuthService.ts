import http from "./http-common";
import { UserData, ILoginData } from "../types/types";

const login = (data: ILoginData) => {
    return http.post<UserData>("/auth/login", data);
};

const refresh = () => {
    return http.get<UserData>("/auth/refresh", { withCredentials: true });
};

const AuthService = { login, refresh };

export default AuthService;