import React from "react";
import Button from "react-bootstrap/Button";
import useStyles from "./stayle";
import { Link } from "react-router-dom";

const ButtonRegister = ({ text, to }) => {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.Link}>
      <Button className={classes.Button}>{text}</Button>
    </Link>
  );
};

export default ButtonRegister;
