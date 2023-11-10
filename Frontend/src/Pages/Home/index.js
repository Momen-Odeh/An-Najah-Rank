import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import axios from "axios";
const Home = () => {
  const setActiveTab = useOutletContext();
  useEffect(() => {
    setActiveTab(routeNames.HOME);
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
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={clickBtn}>Click me</button>
    </div>
  );
};

export default Home;
