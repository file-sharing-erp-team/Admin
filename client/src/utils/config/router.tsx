import React from "react";
import { Routes, Route } from "react-router-dom";

import exportRoutes from "./config";
import IsLoggedIn from "./IsLoggedIn";

const Router = () => {
    return (
        <Routes>
            {exportRoutes.map((route, index) => {
                const where = route.auth ? (
                    <IsLoggedIn
                        key={index}
                        Component={route.component}
                        path={route.path}
                        auth={true}
                    />
                ) : (
                    <route.component />
                );
                return <Route key={index} path={route.path} element={where} />;
            })}
        </Routes>
    );
};

export default Router;