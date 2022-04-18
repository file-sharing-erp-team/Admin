import React from "react";
import paths from "./paths";
import {
  LoginPage,
  HomePage,
  CoursesPage,
  SchedulePage,
  AboutPage,
  Course,
  CreateCoursePage,
  TaskPage,
} from "../pages";
import MaterialPage from "../pages/MaterialPage";

const exportRoutes: {
  path: string;
  name: string;
  available: boolean;
  exact: boolean;
  auth: boolean;
  component: React.ComponentType;
}[] = [];

interface Path {
  name: string;
  available: boolean;
  exact: boolean;
  component: React.ComponentType;
  auth: boolean;
}

const routes: Path[] = [
  {
    name: "homePath",
    available: true,
    exact: true,
    component: HomePage,
    auth: true,
  },
  {
    name: "loginPath",
    available: true,
    exact: true,
    component: LoginPage,
    auth: false,
  },
  {
    name: "coursesPath",
    available: true,
    exact: true,
    component: CoursesPage,
    auth: true,
  },
  {
    name: "schedulePath",
    available: true,
    exact: true,
    component: SchedulePage,
    auth: true,
  },
  {
    name: "aboutPath",
    available: true,
    exact: true,
    component: AboutPage,
    auth: false,
  },
  {
    name: "course",
    available: true,
    exact: true,
    component: Course,
    auth: true,
  },
  {
    name: "createCourse",
    available: true,
    exact: true,
    component: CreateCoursePage,
    auth: true,
  },
  {
    name: "material",
    available: true,
    exact: true,
    component: MaterialPage,
    auth: true,
  },
  {
    name: "task",
    available: true,
    exact: true,
    component: TaskPage,
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
