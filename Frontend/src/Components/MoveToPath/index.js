import React from "react";
import { Navigate, useParams } from "react-router-dom";

const MoveToPath = ({ startPath = "challenge", middle = null, endPath }) => {
  const { id, contestId } = useParams();
  if (middle) {
    return (
      <Navigate to={`/${startPath}/${id}/${middle}/${contestId}/${endPath}`} />
    );
  }
  return <Navigate to={`/${startPath}/${id}/${endPath}`} />;
};

export default MoveToPath;
