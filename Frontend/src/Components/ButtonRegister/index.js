import React from "react";
import Button from "react-bootstrap/Button";
import useStyles from "./stayle";

const ButtonRegister = ({ text }) => {
  const classes = useStyles();
  return <Button className={classes.Button}>{text}</Button>;
};

export default ButtonRegister;
