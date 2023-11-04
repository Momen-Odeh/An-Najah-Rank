import React from "react";
import useStyle from "./style";
import { FaTimes } from "react-icons/fa";
const CancelModeratorsBtn = ({
  onClick,
  backgroundColor = "#e4e4e4",
  hoverBackgroundColor = "#b1b1b1",
}) => {
  const classes = useStyle({ backgroundColor, hoverBackgroundColor });
  return <FaTimes className={`${classes.button}`} onClick={onClick} />;
};

export default CancelModeratorsBtn;
