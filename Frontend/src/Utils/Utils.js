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
import IsLoggedIn from "../Components/Authorization/IsLoggedIn";
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
    component: <IsLoggedIn moveTo={'log-in'}> <Home /> </IsLoggedIn>,
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
    component: <IsLoggedIn moveTo={'log-in'}> <Challenge /> </IsLoggedIn>,
  },
  {
    path: "/challenge/submissions",
    title: routeNames.CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><Challenge /></IsLoggedIn>,
  },
  {
    path: "/challenge/leaderboard",
    title: routeNames.CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><Challenge /></IsLoggedIn>,
  },
  {
    path: "/challenge/discussions",
    title: routeNames.CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><Challenge /></IsLoggedIn>,
  },
  {
    path: "/create-challenge/details",
    title: routeNames.CREATE_CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><CreateChallenge /></IsLoggedIn>,
  },
  {
    path: "/create-challenge/moderators",
    title: routeNames.CREATE_CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><CreateChallenge /></IsLoggedIn>,
  },
  {
    path: "/create-challenge/test-cases",
    title: routeNames.CREATE_CHALLENGE,
    component: <IsLoggedIn moveTo={'log-in'}><CreateChallenge /></IsLoggedIn>,
  },
  {
    path: "/create-contest/details",
    title: routeNames.CREATE_CONTEST,
    component: <IsLoggedIn moveTo={'log-in'}><CreateContest /></IsLoggedIn>,
  },
  {
    path: "/create-contest/challenges",
    title: routeNames.CREATE_CONTEST,
    component: <IsLoggedIn moveTo={'log-in'}><CreateContest /></IsLoggedIn>,
  },
  {
    path: "/create-course/details",
    title: routeNames.CREATE_COURSE,
    component: <IsLoggedIn moveTo={'log-in'}><CreateCourse /></IsLoggedIn>,
  },
  {
    path: "/create-course/moderators",
    title: routeNames.CREATE_COURSE,
    component: <IsLoggedIn moveTo={'log-in'}><CreateCourse /></IsLoggedIn>,
  },
  {
    path: "/contest-view",
    title: routeNames.CONTEST_VIEW,
    component: <IsLoggedIn moveTo={'log-in'}><ContestView /></IsLoggedIn>,
  },
  {
    path: "/enroll-student",
    title: routeNames.ENROLL_STUDENT,
    component: <IsLoggedIn moveTo={'log-in'}><EnrollStudent /></IsLoggedIn>,
  },
  {
    path: "/course-view/course",
    title: routeNames.COURSE_VIEW,
    component: <IsLoggedIn moveTo={'log-in'}><CourseView /></IsLoggedIn>,
  },
  {
    path: "/course-view/members",
    title: routeNames.COURSE_VIEW,
    component: <IsLoggedIn moveTo={'log-in'}><CourseView /></IsLoggedIn>,
  },
  {
    path: "/administration/courses",
    title: routeNames.ADMINISTRATION,
    component: <IsLoggedIn moveTo={'log-in'}><Administration /></IsLoggedIn>,
  },
  {
    path: "/administration/contests",
    title: routeNames.ADMINISTRATION,
    component:  <IsLoggedIn moveTo={'log-in'}><Administration /></IsLoggedIn>,
  },
  {
    path: "/administration/challenges",
    title: routeNames.ADMINISTRATION,
    component:  <IsLoggedIn moveTo={'log-in'}><Administration /></IsLoggedIn>,
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
