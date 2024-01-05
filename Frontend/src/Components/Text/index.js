import React from "react";
import useStyles from "./style";
const Text = ({
  text,
  color = "#000000",
  height = "24px",
  size = "16px",
  wegiht = "400",
  fontFamily = "Poppins",
  whiteSpace = false,
}) => {
  const classes = useStyles({
    fontFamily,
    color,
    height,
    size,
    wegiht,
    whiteSpace,
  });
  return <span className={classes.Text}>{text}</span>;
};

export default Text;
