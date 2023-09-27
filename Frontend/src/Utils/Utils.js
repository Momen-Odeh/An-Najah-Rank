import { lazy } from "react";
import { Route } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
import ForgetPassword from "../Pages/ForgetPassword";
import VerificationCode from "../Pages/VerificationCode";
import NewPassword from "../Pages/NewPassword";
import Challenge from "../Pages/Challenge";
import Home from "../Pages/Home";
import CreateChallenge from "../Pages/CreateChallenge";
import CreateContest from "../Pages/CreateContest";

// const AboutUs = lazy(() => import("../Pages/AboutUs/SubComponents/AboutUs"))

export const routeNames = {
  HOME: "Home",
  SIGN_UP: "Sign Up",
  LOG_IN: "Log In",
  FORGET_PASSWORD: "Forget Password",
  VERIFICATION_CODE: "VErification Code",
  NEW_PASSWORD: "New Password",
  CHALLENGE: "Challenge",
  CREATE_CHALLENGE: "Create Challenge",
  CREATE_CONTEST: "Create Contest",
};
export const routes = [
  {
    path: "/",
    title: routeNames.HOME,
    component: <Home />,
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
    path: "/forget-password",
    title: routeNames.FORGET_PASSWORD,
    component: <ForgetPassword />,
  },
  {
    path: "/verification-code",
    title: routeNames.VERIFICATION_CODE,
    component: <VerificationCode />,
  },
  {
    path: "/new-password",
    title: routeNames.NEW_PASSWORD,
    component: <NewPassword />,
  },
  {
    path: "/challenge",
    title: routeNames.CHALLENGE,
    component: <Challenge />,
  },
  {
    path: "/create-challenge",
    title: routeNames.CREATE_CHALLENGE,
    component: <CreateChallenge />,
  },
  {
    path: "/create-contest",
    title: routeNames.CREATE_CONTEST,
    component: <CreateContest />,
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
