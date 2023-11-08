import React, { useContext, useEffect } from "react";
import userContext from "../../Utils/userContext";
const IsAdmin = ({ moveTo, children }) => {
  const { activeUser } = useContext(userContext);
  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);
  return children;
};

export default IsAdmin;
