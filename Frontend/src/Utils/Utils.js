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
import CourseView from "../Pages/CourseView";
import Administration from "../Pages/Administration";
import Challenges from "../Pages/Challenges";
import Profile from "../Pages/Profile";
import Contests from "../Pages/Contests";
import Course from "../Pages/Course";
import Settings from "../Pages/Settings";
import Admin from "../Pages/Admin";
import Chatting from "../Pages/Chatting";
import SubmissionsManualMarking from "../Components/SubmissionsManualMarking";
import CodeSimilarity from "../Components/CodeSimilarity";
import NotFound from "../Components/NotFound";
import AllNotification from "../Pages/AllNotification";
import AllCourse from "../Pages/AllCourses";
import ProfessorsRequests from "../Pages/Admin/ProfessorsRequests";
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
    component: <Home />,
  },
  {
    path: "/notifications",
    title: "Notification",
    component: <AllNotification />,
  },
  {
    path: "/chatting",
    title: "Chatting",
    component: <Chatting />,
  },
  {
    path: "/profile",
    title: routeNames.PROFILE,
    component: <Outlet />,
    subRoutes: [
      {
        index: true,
        component: <Profile />,
      },
      {
        title: "user profiles",
        path: ":id",
        component: <Profile />,
      },
    ],
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
  // {
  //   path: "/enroll-student",
  //   title: routeNames.ENROLL_STUDENT,
  //   component: <EnrollStudent />,
  // },
  //**************************************************/courses**************************************************************/
  {
    path: "/courses",
    title: routeNames.COURSE_VIEW,
    component: <Outlet />,
    subRoutes: [
      {
        index: true,
        component: <AllCourse />,
      },
      {
        path: ":id",
        title: "courseWithId",
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
                          {
                            title: "submissions",
                            path: "submissions",
                            component: <Outlet />,
                            subRoutes: [
                              {
                                index: true,
                                component: <Challenge />,
                              },
                              {
                                title: "problem",
                                path: ":submissionId",
                                component: <Challenge />,
                              },
                              {
                                title: "studentSubmissions",
                                path: "manual-mark",
                                component: <Navigate to={".."} />,
                              },
                              {
                                title: "studentSubmissions",
                                path: "manual-mark/:studentId",
                                component: <SubmissionsManualMarking />,
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
  /******************************************* /admin ***********************************/
  {
    path: "/admin",
    title: routeNames.ADMIN,
    component: <Outlet />,
    subRoutes: [
      {
        index: true,
        component: <Admin />,
      },
      /******************************************* /administration/courses/create-course ***********************************/
      {
        path: "professors-requests",
        title: "professors-requests",
        component: <Admin />,
      },
      {
        path: "professors",
        title: "professors",
        component: <Admin />,
      },
      {
        path: "students",
        title: "students",
        component: <Admin />,
      },
      {
        path: "statistics",
        title: "statistics",
        component: <Admin />,
      },
    ],
  },
  /******************************************* /administration ***********************************/
  {
    path: "/administration",
    title: routeNames.ADMINISTRATION,
    component: <Outlet />,
    subRoutes: [
      {
        index: true,
        component: <Administration />,
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
                component: <Course />,
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
                        component: <Contests />,
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
                component: <Challenges />,
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
  {
    title: "Not Found",
    path: "*",
    component: <NotFound />,
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
