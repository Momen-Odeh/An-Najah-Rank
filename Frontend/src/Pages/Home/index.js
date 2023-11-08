import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
const Home = () => {
  const setActiveTab = useOutletContext();
  useEffect(() => {
    setActiveTab(routeNames.HOME);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
