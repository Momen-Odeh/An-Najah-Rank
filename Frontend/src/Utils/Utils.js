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
import Profile from "../Pages/Profile";
import Contests from "../Pages/Contests";
import Course from "../Pages/Course";
import Settings from "../Pages/Settings";
import Admin from "../Pages/Admin";
import NotificationComponent from "../Components/Notification";
import SubmissionsManualMarking from "../Components/SubmissionsManualMarking";
import UploadFile from "../Components/UploadFile";
import CodeSimilarity from "../Components/CodeSimilarity";
import Submission from "../Components/Submission";
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
  SETTINGS: "Settings",
  ADMIN: "Admin",
};
export const routes = [
  {
    path: "/",
    title: routeNames.HOME,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Home />
      </IsLoggedIn>
    ),
  },
  {
    path: "/code-similarity",
    title: "code Similarity",
    component: <CodeSimilarity />,
  },
  {
    path: "/profile",
    title: routeNames.PROFILE,
    component: <Profile />,
  },
  {
    path: "/settings",
    title: routeNames.SETTINGS,
    component: <Settings />,
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
    path: "/enroll-student",
    title: routeNames.ENROLL_STUDENT,
    component: <EnrollStudent />,
  },
  //**************************************************/courses**************************************************************/
  {
    path: "/courses",
    title: routeNames.COURSE_VIEW,
    component: (
      //<IsLoggedIn moveTo={"log-in"}>
      <Outlet />
      //</IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <h1>courses Here</h1>,
      },
      {
        path: ":id",
        title: "courseWitId",
        component: <Outlet />,
        subRoutes: [
          {
            index: true,
            component: <CourseView />,
          },
          {
            title: "contests",
            path: "contests",
            component: <Outlet />,
            subRoutes: [
              {
                index: true,
                component: <CourseView />,
              },
              {
                title: routeNames.CONTEST_VIEW,
                path: ":contestId",
                component: <Outlet />,
                subRoutes: [
                  {
                    index: true,
                    component: <ContestView />,
                  },
                  {
                    title: "challenges",
                    path: "challenges",
                    component: <Outlet />,
                    subRoutes: [
                      {
                        index: true,
                        component: <ContestView />,
                      },
                      {
                        title: "challenge",
                        path: ":challengeId",
                        component: <Outlet />,
                        subRoutes: [
                          {
                            index: true,
                            component: <Challenge />,
                          },
                          {
                            title: "problem",
                            path: "problem",
                            component: <Challenge />,
                          },
                          {/*--------------------------------------submission view for students and professors-----------------------*/
                            title: "submissions",
                            path: "submissions",
                            component: <Outlet />,
                            subRoutes: [
                              {
                                index: true,
                                component: <Challenge />,
                              },
                              {//this is under submissions
                                title: "specific submission",
                                path: ":submissionId",
                                component: <Challenge />,
                              },
                              {
                                title: "code Similarity",
                                path: "code-similarity",
                                component: <Navigate to={".."} />,
                              },
                              {
                                title: "code Similarity with user id",
                                path: "code-similarity/:userId",
                                component: <CodeSimilarity />,
                              },
                              {
                                title: "manual mark",
                                path: "manual-mark",
                                component: <Navigate to={".."} />,
                              },
                              {
                                title: "student Submissions and manual mark",
                                path: "manual-mark/:studentId",
                                component: <SubmissionsManualMarking />,
                              },
                            ],
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
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "members",
            path: "members",
            component: <CourseView />,
          },
        ],
      },
    ],
  },
  //**************************************************/courses**************************************************************/
  // {
  //   path: "/notification",
  //   title: "Notification",
  //   component: <NotificationComponent />,
  // },
  {
    path: "/SubmissionsManualMarking",
    title: "SubmissionsManualMarking",
    component: <SubmissionsManualMarking />,
  },
  /******************************************* /admin ***********************************/
  {
    path: "/admin",
    title: routeNames.ADMIN,
    component: (
      <IsLoggedIn moveTo={"log-in"}>
        <Admin />
      </IsLoggedIn>
    ),
  },
  /******************************************* /administration ***********************************/
  {
    path: "/administration",
    title: routeNames.ADMINISTRATION,
    component: (
      <IsLoggedIn moveTo={"log-in"} isAdmin={true}>
        <Outlet />
      </IsLoggedIn>
    ),
    subRoutes: [
      {
        index: true,
        component: <Navigate to={"/administration/courses"} />,
      },
      /******************************************* /administration/courses ***********************************/
      {
        title: "courses",
        path: "courses",
        component: <Outlet />,
        subRoutes: [
          {
            index: true,
            component: <Administration />,
          },
          /******************************************* /administration/courses/create-course ***********************************/
          {
            path: "create-course",
            title: routeNames.CREATE_COURSE,
            component: <CreateCourse />,
          },
          /******************************************* /administration/courses/:id ***********************************/
          {
            path: ":id",
            title: routeNames.COURSE,
            component: <Outlet />,
            subRoutes: [
              {
                index: true,
                component: <Navigate to={"details"} />,
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
              /******************************************* /administration/courses/:id/contests ***********************************/
              {
                title: "contests",
                path: "contests",
                component: <Outlet />,
                subRoutes: [
                  {
                    index: true,
                    component: <Course />,
                  },
                  /******************************************* /administration/courses/:id/contests/create-contest ***********************************/
                  {
                    path: "create-contest",
                    title: routeNames.CREATE_CHALLENGE,
                    component: <CreateContest />,
                  },
                  /******************************************* /administration/courses/:id/contests/:contestId ***********************************/
                  {
                    path: ":contestId",
                    title: routeNames.CONTESTS,
                    component: <Outlet />,
                    subRoutes: [
                      {
                        index: true,
                        component: <Navigate to={"details"} />,
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
                ],
              },
            ],
          },
        ],
      },

      /******************************************* /administration/challenges ***********************************/

      {
        title: "challenges",
        path: "challenges",
        component: <Outlet />,
        subRoutes: [
          {
            index: true,
            component: <Administration />,
          },

          /******************************************* /administration/challenges/create-challenge ***********************************/

          {
            path: "create-challenge",
            title: routeNames.CREATE_CHALLENGE,
            component: <CreateChallenge />,
          },

          /******************************************* /administration/challenges/:id ***********************************/

          {
            path: ":id",
            title: routeNames.CHALLENGES,
            component: <Outlet />,
            subRoutes: [
              {
                index: true,
                component: <Navigate to={"details"} />,
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
        ],
      },
    ],
  },
];

/******************************************* function to generate routes ***********************************/
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
