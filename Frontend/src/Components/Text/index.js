import React from "react";
import useStyles from "./style";
const Text = ({
  text,
  color = "#000000",
  height = "24px",
  size = "16px",
  wegiht = "400",
  fontFamily = "Poppins",
  cursor = "",
  whiteSpace = false,
  onClick,
  hover,
}) => {
  const classes = useStyles({
    fontFamily,
    color,
    height,
    size,
    wegiht,
    whiteSpace,
    cursor,
    hover,
  });
  return (
    <span className={classes.Text} onClick={onClick}>
      {text}
    </span>
  );
};

export default Text;
