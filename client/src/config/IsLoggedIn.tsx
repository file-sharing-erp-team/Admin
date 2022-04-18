import React, { Component, useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { AuthMiddlewarePage } from "../pages";

interface Props {
  Component: React.ComponentType;
  path: string;
  exact: boolean;
}

const IsLoggedIn: React.FC<Props> = ({ Component, path, children }) => {
  const { token } = useContext(AuthContext);
  const storage = sessionStorage.getItem("dataSystem" || "{}");

  if (!!token && storage !== null) {
    return <Component />;
  } else {
    return <AuthMiddlewarePage path={path} />;
  }
};

export default IsLoggedIn;
