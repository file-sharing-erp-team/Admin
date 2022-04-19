import React from "react";
import paths from "./paths";
import {
    LoginPage,
    AboutPage,
} from "../../pages";

const exportRoutes: {
    path: string;
    name: string;
    available: boolean;
    auth: boolean;
    component: React.ComponentType;
}[] = [];

interface Path {
    name: string;
    available: boolean;
    component: React.ComponentType;
    auth: boolean;
}

const routes: Path[] = [

    {
        name: "loginPath",
        available: true,
        component: LoginPage,
        auth: false,
    },
    {
        name: "aboutPath",
        available: true,
        component: AboutPage,
        auth: true,
    },

];

const applyRoutes = () => {
    routes.map((route, index) => {
        if (route.available) {
            paths.map((path, index) => {
                if (path[0] === route.name) {
                    const newRoute = { ...route, path: path[1] };
                    exportRoutes.push(newRoute);
                }
            });
        }
    });
};

applyRoutes();

export default exportRoutes;