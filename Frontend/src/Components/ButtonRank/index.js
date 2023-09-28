import React from "react";
import { Button } from "react-bootstrap";
import useStyles from "./style";

const ButtonRank = ({
  text,
  backgroundColor = "#f0f0f4",
  color = "#39424E",
  size = "16px",
  border = "1px solid #c2c7d0",
  hoverBackgroundColor = "#1cb557",
  onClick,
  disabled=false,
}) => {
  const classes = useStyles({
    backgroundColor,
    color,
    size,
    border,
    hoverBackgroundColor,
  });
  return <Button className={classes.Button} onClick={onClick} disabled={disabled} >{text}</Button>;
};

export default ButtonRank;
