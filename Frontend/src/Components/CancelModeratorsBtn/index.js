import React from "react";
import useStyle from "./style";
import { FaTimes } from "react-icons/fa";
const CancelModeratorsBtn = ({ onClick }) => {
  const classes = useStyle();
  return <FaTimes className={`${classes.button}`} onClick={onClick} />;
};

export default CancelModeratorsBtn;
