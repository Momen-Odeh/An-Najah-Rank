import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom"

const IsLoggedIn = ({ moveTo, children }) => {
  const [cookies, setCookies] = useCookies();

  return cookies?.token ? children : <Navigate to={"/"+moveTo} />;
}

export default IsLoggedIn