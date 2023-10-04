import React from "react";
import { Alert } from "react-bootstrap";
import useStyle from "./Style";
const AlertComponent = ({ variant = "warning", message, show }) => {
  const classes = useStyle();
  return (
    <Alert
      key={variant}
      variant={variant}
      className={classes.alert}
      show={show}
    >
      {message}
    </Alert>
  );
};

export default AlertComponent;
