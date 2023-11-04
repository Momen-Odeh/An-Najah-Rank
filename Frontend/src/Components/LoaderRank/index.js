import React from "react";
import Loader from "react-spinners/ClipLoader";
const LoaderRank = ({ loading }) => {
  return loading && <Loader size={50} color="#191e35" speedMultiplier={1} />;
};

export default LoaderRank;
