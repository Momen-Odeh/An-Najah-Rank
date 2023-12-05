import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { routeNames } from "../Utils/Utils";
import userContext from "../Utils/userContext";
import useStyles from "./style";
import Cookies from "js-cookie";
import axios from "axios";

function PageLayout() {
  const [activeTab, setActiveTab] = useState(routeNames.HOME);
  const [activeUser, setActiveUser] = useState({});
  const classes = useStyles();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get("/checkToken")
        .then((res) => {
          setActiveUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className={classes.Layout}>
      <userContext.Provider
        value={{ activeUser: activeUser, setActiveUser: setActiveUser }}
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
