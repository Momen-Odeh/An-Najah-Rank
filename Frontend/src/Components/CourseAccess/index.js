import React, { useContext, useEffect } from "react";
import userContext from "../../Utils/userContext";
import axios from "axios";
const CourseAccess = ({ children }) => {
  useEffect(() => {
    axios
      .get("/accessCourse", {
        params: {
          courseNumber: "144",
        },
      })
      .then((response) => {
        console.log("EEEEEEEEEEEEe", response);
      })
      .catch((error) => {
        console.log("QQQQQQQQQQQQQQQ", error);
      });
  }, []);
  return children;
};

export default CourseAccess;
