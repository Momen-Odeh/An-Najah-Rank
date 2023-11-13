import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import userContext from "../../Utils/userContext";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import Cookies from "js-cookie";
const IsLoggedIn = ({ moveTo, children, isAdmin }) => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(userContext);
  useEffect(() => {
    // console.log("Admin *******", isAdmin);
    axios
      .get("http://localhost:5000/checkToken", {
        params: {
          token: Cookies.get("token"),
        },
      })
      .then((response) => {
        if (isAdmin) {
          if (
            response.data.role === "professor" ||
            response.data.role === "admin"
          ) {
            setActiveUser(response.data);
          } else {
            toastError("professor access only");
            navigate("/");
          }
        } else {
          setActiveUser(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toastError("unauthorized access");
        navigate("/" + moveTo);
      });
  }, [isAdmin]);
  return children;
};

export default IsLoggedIn;
