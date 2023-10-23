import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import userContext from "../../Utils/userContext";
const IsLoggedIn = ({ moveTo, children }) => {
  const [cookies, setCookies] = useCookies();
  const { activeUser, setActiveUser } = useContext(userContext);
  return cookies?.token ? children : <Navigate to={"/" + moveTo} />;
};

export default IsLoggedIn;
