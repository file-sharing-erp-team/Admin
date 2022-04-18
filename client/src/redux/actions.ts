import {
  AUTH_USER,
  LOGOUT_USER,
  SHOW_LOADER,
  HIDE_LOADER,
  LOAD_USER,
} from "./types";
import { Dispatch, useContext } from "react";
import { Cookies } from "react-cookie";
import AuthService from "../utils/service/AuthService";
import { AuthContext } from "../utils/context/AuthContext";

export function showLoader() {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: SHOW_LOADER });
  };
}

export function hideLoader() {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: HIDE_LOADER });
  };
}

export function logOut() {
  const cookies = new Cookies();
  return (dispatch: Dispatch<any>) => {
    dispatch(showLoader());
    window.sessionStorage.removeItem("dataSystem");
    cookies.remove("refreshToken");
    dispatch({ type: LOGOUT_USER });
  };
}

export function logUser(data: any) {
  return (dispatch: Dispatch<any>) => {
    dispatch(showLoader());
    window.sessionStorage.setItem("dataSystem", JSON.stringify({ ...data }));
    dispatch({ type: AUTH_USER, payload: data });
    dispatch(hideLoader());
  };
}

export function loadUser() {
  const cookies = new Cookies();
  return async (dispatch: Dispatch<any>) => {
    dispatch(showLoader());
    const data = JSON.parse(
      window.sessionStorage.getItem("dataSystem") || "{}"
    );
    const token = cookies.get("refreshToken");
    let response;
    if (Object.keys(data).length > 0)
      dispatch({ type: LOAD_USER, payload: data });
    else {
      try {
        response = await AuthService.refresh();
        dispatch({ type: LOAD_USER, payload: response.data });
      } catch (e: any) {
        dispatch(hideLoader());
        throw new Error(e);
      }
    }
    dispatch(hideLoader());
  };
}
