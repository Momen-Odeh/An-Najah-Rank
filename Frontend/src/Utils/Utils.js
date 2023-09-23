import { lazy } from "react";
import { Route } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";

// const AboutUs = lazy(() => import("../Pages/AboutUs/SubComponents/AboutUs"))

export const routeNames = {
  HOME: "Home",
  SIGN_UP: "Sign Up",
  LOG_IN: "Log In",
  FORGET_PASSWORD: "Forget Pass",
  AUTHENTICATION_EMAIL: "Auth Email",
};
export const routes = [
  {
    path: "/",
    title: routeNames.HOME,
    component: <h3>Home Page</h3>,
  },
  {
    path: "/sign-up",
    title: routeNames.SIGN_UP,
    component: <SignUp />,
  },
  {
    path: "/log-in",
    title: routeNames.LOG_IN,
    component: <LogIn />,
  },
  {
    path: "/forget-pass",
    title: routeNames.FORGET_PASSWORD,
    component: <h3>forget password page</h3>,
  },
  {
    path: "/authentication-email",
    title: routeNames.AUTHENTICATION_EMAIL,
    component: <h3>authentication email page</h3>,
  },
];

export const generateRoutes = (routes) => {
  let _routes = routes.map((route, idx) => {
    if (route.subRoutes) {
      return (
        <Route key={idx} path={route.path} element={route.component}>
          {generateRoutes(route.subRoutes)}
        </Route>
      );
    } else {
      if (route.index)
        return <Route key={idx} index element={route.component} />;
      else
        return <Route key={idx} path={route.path} element={route.component} />;
    }
  });

  return _routes;
};
