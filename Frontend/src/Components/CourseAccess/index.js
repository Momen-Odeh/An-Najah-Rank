import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const CourseAccess = ({ children }) => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/accessCourse", {
        params: {
          courseNumber: id,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return children;
};

export default CourseAccess;
