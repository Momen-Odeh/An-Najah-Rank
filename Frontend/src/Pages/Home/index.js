import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import Loader from "../../Components/Loader";
import axios from "axios";
const Home = () => {
  const setActiveTab = useOutletContext();
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    setActiveTab(routeNames.HOME);
    setLoadingPage(false);
  }, []);
  const clickBtn = () => {
    console.log("Click");
    axios
      .get("/flask")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return loadingPage ? (
    <Loader />
  ) : (
    <div>
      <h1>Home Page</h1>
      <button onClick={clickBtn}>Click me</button>
    </div>
  );
};

export default Home;
