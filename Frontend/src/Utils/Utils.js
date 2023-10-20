import { lazy } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
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
import Challenges from "../Pages/Challenges";
import MoveToPath from "../Components/MoveToPath";
import Profile from "../Pages/Profile";
import Contests from "../Pages/Contests";
import Course from "../Pages/Course";
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
  CHALLENGES: "Challenges",
  CREATE_CONTEST: "Create Contest",
  CONTESTS: "Contests",
  CREATE_COURSE: "Create Course",
  CONTEST_VIEW: "Contest View",
  COURSE_VIEW: "Course View",
  ADMINISTRATION: "Administration",
  ENROLL_STUDENT: "Enroll Student",
  PROFILE: "Profile",
  COURSE: "Course",
};
export const routes = [
  {
    path: "/",
    title: routeNames.HOME,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        {" "}
        <Home />{" "}
      </IsLoggedIn>
    ),
  },
  {
    path: "/profile",
    title: routeNames.PROFILE,
    component: <Profile />,
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
    path: "/challenge/:id",
    title: routeNames.CHALLENGE,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        {" "}
        <Outlet />{" "}
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <MoveToPath endPath={"problem"} />,
      },
      {
        title: "problem",
        path: "problem",
        component: <Challenge />,
      },
      {
        title: "submissions",
        path: "submissions",
        component: <Challenge />,
      },
      {
        title: "leaderboard",
        path: "leaderboard",
        component: <Challenge />,
      },
      {
        title: "discussions",
        path: "discussions",
        component: <Challenge />,
      },
    ],
  },
  {
    path: "/create-challenge",
    title: routeNames.CREATE_CHALLENGE,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/create-challenge/details"} />,
      },
      {
        title: "details",
        path: "details",
        component: <CreateChallenge />,
      },
    ],
  },
  {
    path: "/challenges/:id",
    title: routeNames.CHALLENGES,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <MoveToPath startPath="challenges" endPath="details" />,
      },
      {
        title: "details",
        path: "details",
        component: <Challenges />,
      },
      {
        title: "test-cases",
        path: "test-cases",
        component: <Challenges />,
      },
    ],
  },
  {
    path: "/create-contest",
    title: routeNames.CREATE_CHALLENGE,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/create-contest/details"} />,
      },
      {
        title: "details",
        path: "details",
        component: <CreateContest />,
      },
    ],
  },
  {
    path: "/contests/:id",
    title: routeNames.CONTESTS,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <MoveToPath startPath="contests" endPath="details" />,
      },
      {
        title: "details",
        path: "details",
        component: <Contests />,
      },
      {
        title: "challenges",
        path: "challenges",
        component: <Contests />,
      },
    ],
  },
  {
    path: "/create-course",
    title: routeNames.CREATE_COURSE,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/create-course/details"} />,
      },
      {
        title: "details",
        path: "details",
        component: <CreateCourse />,
      },
    ],
  },
  {
    path: "/course/:id",
    title: routeNames.COURSE,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <MoveToPath startPath="course" endPath="details" />,
      },
      {
        title: "details",
        path: "details",
        component: <Course />,
      },
      {
        title: "moderators",
        path: "moderators",
        component: <Course />,
      },
      {
        title: "members",
        path: "members",
        component: <Course />,
      },
    ],
  },
  {
    path: "/contest-view/:id",
    title: routeNames.CONTEST_VIEW,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <ContestView />
      </IsLoggedIn>
    ),
  },
  {
    path: "/enroll-student",
    title: routeNames.ENROLL_STUDENT,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <EnrollStudent />
      </IsLoggedIn>
    ),
  },
  {
    path: "/course-view",
    title: routeNames.COURSE_VIEW,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/course-view/course"} />,
      },
      {
        title: "course",
        path: "course",
        component: <CourseView />,
      },
      {
        title: "members",
        path: "members",
        component: <CourseView />,
      },
    ],
  },
  {
    path: "/administration",
    title: routeNames.ADMINISTRATION,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/administration/courses"} />,
      },
      {
        title: "courses",
        path: "courses",
        component: <Administration />,
      },
      {
        title: "contests",
        path: "contests",
        component: <Administration />,
      },
      {
        title: "challenges",
        path: "challenges",
        component: <Administration />,
      },
    ],
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
