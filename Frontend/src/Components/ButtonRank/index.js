import React from "react";
import { Button } from "react-bootstrap";
import useStyles from "./style";

const ButtonRank = ({
  text,
  backgroundColor = "#f0f0f4",
  color = "#39424E",
  size = "16px",
  border = "1px solid #c2c7d0",
  hoverBackgroundColor = "#0e141e",
  onClick,
  disabled = false,
  width,
  type,
  weight = "500",
}) => {
  const classes = useStyles({
    backgroundColor,
    color,
    size,
    border,
    hoverBackgroundColor,
    width,
    weight,
  });
  return (
    <Button
      type={type}
      className={classes.Button}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ButtonRank;
