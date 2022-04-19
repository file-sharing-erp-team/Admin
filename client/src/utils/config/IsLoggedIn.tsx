import React, { Component, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthMiddlewarePage } from "../../pages";

interface Props {
    Component: React.ComponentType;
    path: string;
    auth: boolean;
}

const IsLoggedIn: React.FC<Props> = ({ Component, path, auth }) => {
    const { token } = useContext(AuthContext);
    console.log(token)
    const storage = sessionStorage.getItem("dataSystem" || "{}");
    console.log(storage)
    if (!!token && storage !== null) {
        return <Component/>;
    } else {
        return <AuthMiddlewarePage path={path} />;
    }
};

export default IsLoggedIn;