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
    <Container fluid className={classes.Container}>
      <Row
        className={`${classes.Row} align-items-center justify-content-center`}
      >
        <Col xs={12} md={6} className={classes.ColLeft}>
          <LogInForm />
        </Col>
        <Col xs={3} md={6} className={`${classes.ColRight}`}>
          <RegistrationShow />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationLayout;
