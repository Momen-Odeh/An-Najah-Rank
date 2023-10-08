import React from "react";
import { Navigate, useParams } from "react-router-dom";

const MoveToPath = ({ endPath }) => {
  const { id } = useParams();
  return <Navigate to={`/challenge/${id}/${endPath}`} />;
};

export default MoveToPath;
