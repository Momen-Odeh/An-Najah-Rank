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
import CreateCourse from "../Pages/CreateCourse";
import ContestView from "../Pages/ContestView";
import EnrollStudent from "../Pages/EnrollStudent";
import CourseView from "../Pages/CourseView";
import Administration from "../Pages/Administration";

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
  CREATE_COURSE:"Create Course",
  CONTEST_VIEW: "Contest View",
  COURSE_VIEW: "Course View",
  ADMINISTRATION: "Administration",
  ENROLL_STUDENT: "Enroll Student",
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
    path: "/challenge/problem",
    title: routeNames.CHALLENGE,
    component: <Challenge />,
  },
  {
    path: "/challenge/submissions",
    title: routeNames.CHALLENGE,
    component: <Challenge />,
  },
  {
    path: "/challenge/leaderboard",
    title: routeNames.CHALLENGE,
    component: <Challenge />,
  },
  {
    path: "/challenge/discussions",
    title: routeNames.CHALLENGE,
    component: <Challenge />,
  },
  {
    path: "/create-challenge/details",
    title: routeNames.CREATE_CHALLENGE,
    component: <CreateChallenge />,
  },
  {
    path: "/create-challenge/moderators",
    title: routeNames.CREATE_CHALLENGE,
    component: <CreateChallenge />,
  },
  {
    path: "/create-challenge/test-cases",
    title: routeNames.CREATE_CHALLENGE,
    component: <CreateChallenge />,
  },
  {
    path: "/create-contest/details",
    title: routeNames.CREATE_CONTEST,
    component: <CreateContest />,
  },
  {
    path: "/create-contest/challenges",
    title: routeNames.CREATE_CONTEST,
    component: <CreateContest />,
  },
  {
    path: "/create-course/details",
    title: routeNames.CREATE_COURSE,
    component: <CreateCourse />,
  },
  {
    path: "/create-course/moderators",
    title: routeNames.CREATE_COURSE,
    component: <CreateCourse />,
  },
  {
    path: "/contest-view",
    title: routeNames.CONTEST_VIEW,
    component: <ContestView />,
  },
  {
    path: "/enroll-student",
    title: routeNames.ENROLL_STUDENT,
    component: <EnrollStudent />,
  },
  {
    path: "/course-view/course",
    title: routeNames.COURSE_VIEW,
    component: <CourseView />,
  },
  {
    path: "/course-view/members",
    title: routeNames.COURSE_VIEW,
    component: <CourseView />,
  },
  {
    path: "/administration/courses",
    title: routeNames.ADMINISTRATION,
    component: <Administration />,
  },
  {
    path: "/administration/contests",
    title: routeNames.ADMINISTRATION,
    component: <Administration />,
  },
  {
    path: "/administration/challenges",
    title: routeNames.ADMINISTRATION,
    component: <Administration />,
  }
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
