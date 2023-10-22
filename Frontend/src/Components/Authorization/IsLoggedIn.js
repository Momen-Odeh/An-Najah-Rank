import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import userContext from "../../Utils/userContext";
import axios from "axios";
import { toast } from "react-toastify";
const IsLoggedIn = ({ moveTo, children }) => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(userContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/checkToken", {
        params: {
          token: cookies.token,
        },
      })
      .then((response) => {
        setActiveUser(response.data);
      })
      .catch((error) => {
        toast.error("unauthorized access", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/" + moveTo);
      });
  }, []);
  return children;
};

export default IsLoggedIn;
