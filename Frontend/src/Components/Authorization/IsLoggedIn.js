import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import userContext from "../../Utils/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError } from "../../Utils/toast";
const IsLoggedIn = ({ moveTo, children, isAdmin }) => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(userContext);
  useEffect(() => {
    // console.log("Admin *******", isAdmin);
    axios
      .get("http://localhost:5000/checkToken", {
        params: {
          token: cookies.token,
        },
      })
      .then((response) => {
        if (isAdmin) {
          if (response.data.role === "professor") {
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
        toastError("unauthorized access");
        navigate("/" + moveTo);
      });
  }, [isAdmin]);
  return children;
};

export default IsLoggedIn;
