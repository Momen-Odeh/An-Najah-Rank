import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useStyles from "./style";
import LogInForm from "../LoginForm";
import RegistrationShow from "../RegistrationShow";
const RegistrationLayout = () => {
  const classes = useStyles();
  return (
    <Row className={classes.Row}>
      <Col xs={6} className={classes.ColLeft}>
        <LogInForm />
      </Col>
      <Col xs={6} className={classes.ColRight}>
        <RegistrationShow />
      </Col>
    </Row>
  );
};

export default RegistrationLayout;
