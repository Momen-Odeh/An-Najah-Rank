import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { routeNames } from "../Utils/Utils";
import { userContext } from "../Utils/userContext.js";
import { useCookies } from "react-cookie";

function PageLayout() {
  const [activeTab, setActiveTab] = useState(routeNames.HOME);
  const [activeUser, setActiveUser] = useState(null);
  const [cookies, setCookies] = useCookies();
  useEffect(() => {
    if (cookies?.token) {
      setActiveUser({ token: cookies.token });
    }
  }, []);
  return (
    <div>
      <userContext.Provider value={[activeUser, setActiveUser]}>
        <MainNavbar activeTab={activeTab} />
        <Outlet context={setActiveTab} />
        <Footer />
      </userContext.Provider>
    </div>
  );
}

export default PageLayout;
