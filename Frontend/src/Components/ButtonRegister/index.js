import React from "react";
import Button from "react-bootstrap/Button";
import useStyles from "./style";
import { Link } from "react-router-dom";

const ButtonRegister = ({ text, to, onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.Link}>
      <Button className={classes.Button} onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </Link>
  );
};

export default ButtonRegister;
