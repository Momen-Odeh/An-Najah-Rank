import React from "react";
import { Navigate, useParams } from "react-router-dom";

const MoveToPath = ({ startPath='challenge', endPath }) => {
  const { id } = useParams();
  return <Navigate to={`/${startPath}/${id}/${endPath}`} />;
};

export default MoveToPath;