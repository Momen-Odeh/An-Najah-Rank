import React, { useContext, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import Loader from "../../Components/Loader";
import userContext from "../../Utils/userContext";
const Home = () => {
  const setActiveTab = useOutletContext();
  const [loadingPage, setLoadingPage] = useState(true);
  const { activeUser } = useContext(userContext);
  useEffect(() => {
    setActiveTab(routeNames.HOME);
    if (activeUser) setLoadingPage(false);
  }, [activeUser]);

  return loadingPage ? (
    <Loader />
  ) : activeUser.role === "admin" ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/profile" />
  );
};

export default Home;
