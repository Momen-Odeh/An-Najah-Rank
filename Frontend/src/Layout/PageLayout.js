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

function PageLayout() {
  const [activeTab, setActiveTab] = useState(routeNames.HOME);
  const [activeUser, setActiveUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const classes = useStyles();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get("/checkToken")
        .then((res) => {
          setActiveUser(res.data);
        })
        .then(
          axios.get("/get-notifications").then((res) => {
            setNotifications(res.data.notifications);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (activeUser.universityNumber) {
      const socket = io("http://127.0.0.1:5000", {
        query: {
          user_university_number: activeUser.universityNumber,
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
        }}
      >
        <div>
          <MainNavbar activeTab={activeTab} />
          <Outlet context={setActiveTab} />
        </div>
        <Footer className={classes.Footer} />
      </userContext.Provider>
    </div>
  );
}

export default PageLayout;
