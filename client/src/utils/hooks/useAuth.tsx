import { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IUserConfig, UserData } from "../types/types";
const storageName = "dataSystem";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const login = useCallback(
    (
      jwtToken: string,
      refreshToken: string,
      id: number,
      rememberMe: boolean
    ) => {
      setToken(jwtToken);
      setUserId(id);

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: jwtToken,
        })
      );
      if (rememberMe)
        Cookies.set("refreshToken", refreshToken, { httpOnly: false });
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
    Cookies.remove("refreshToken");
  }, []);

  useEffect(() => {
    const data: IUserConfig = JSON.parse(
      localStorage.getItem(storageName) || "{}"
    );

    const isCookie = Cookies.get("refreshToken");

    if (data && data.token && isCookie) {
      login(data.token, isCookie, data.userId, false);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
