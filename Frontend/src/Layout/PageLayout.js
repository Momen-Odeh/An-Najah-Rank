import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { routeNames } from "../Utils/Utils";
import userContext from "../Utils/userContext";
import useStyles from "./style";
import Cookies from "js-cookie";
import axios from "axios";
import { io } from "socket.io-client";
import Loader from "../Components/Loader";
import BaseURI from "../Utils/BaseURI";
function PageLayout() {
  const [activeTab, setActiveTab] = useState(routeNames.HOME);
  const [activeUser, setActiveUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newNotifications, setNewNotifications] = useState(0);
  const classes = useStyles();
  const token = Cookies.get("token");
  const [loadingPage, setLoadingPage] = useState(true);
  const [messageNotification, setMessageNotification] = useState([]);
  useEffect(() => {
    if (token) {
      axios
        .get("/get-user-info")
        .then((res) => {
          setActiveUser(res?.data?.user);
          return axios.get("/get-notifications", { params: { all: 0 } });
        })
        .then((res) => {
          setNotifications(res?.data?.notifications);
          setNewNotifications(
            res.data.notifications?.filter(
              (n) => n.id > res?.data?.lastReadNotification
            )?.length
          );
          return axios.get("/get-conversations", { params: { all: 0 } });
        })
        .then((response) => {
          console.log("conversation for message", response.data);
          setMessageNotification(response.data.conversations);
          setLoadingPage(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingPage(false);
        });
    } else {
      setLoadingPage(false);
    }
  }, []);

  useEffect(() => {
    if (activeUser?.universityNumber) {
      const socket = io(BaseURI, {
        query: {
          user_university_number: activeUser?.universityNumber,
        },
      });
      setSocket(socket);
      return () => {
        socket?.disconnect();
      };
    }
  }, [activeUser]);
  return (
    <div className={classes.Layout}>
      <userContext.Provider
        value={{
          activeUser: activeUser,
          setActiveUser: setActiveUser,
          notifications,
          setNotifications,
          socket,
          setSocket,
          newNotifications,
          setNewNotifications,
          messageNotification,
        }}
      >
        <div>
          <MainNavbar activeTab={activeTab} />
          {/* <Outlet context={setActiveTab} /> */}
          {loadingPage ? <Loader /> : <Outlet context={setActiveTab} />}
        </div>
        <Footer className={classes.Footer} />
      </userContext.Provider>
    </div>
  );
}

export default PageLayout;
