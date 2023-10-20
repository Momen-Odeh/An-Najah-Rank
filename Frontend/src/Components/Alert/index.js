import React from "react";
import { Alert, Container } from "react-bootstrap";
import useStyle from "./Style";
const AlertComponent = ({ variant = "warning", message, show }) => {
  const classes = useStyle();
  return (
    <Container className="mt-2 mb-2">
      <Alert
        key={variant}
        variant={variant}
        className={classes.alert}
        show={show}
      >
        {message}
      </Alert>
    </Container>
  );
};

export default AlertComponent;
