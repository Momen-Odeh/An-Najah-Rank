import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useStyles from "./style";
import LogInForm from "../../Components/LoginForm";
import RegistrationShow from "../../Components/RegistrationShow";
import code from "./images/code.png";
const LogIn = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row
        className={`${classes.Row} align-items-center justify-content-center`}
      >
        <Col xs={3} md={6} className={`${classes.ColRight}`}>
          <RegistrationShow
            img={code}
            title={"Sign in to An-Najah Rank"}
            subTitle={"make your future"}
          />
        </Col>
        <Col xs={12} md={6} className={classes.ColLeft}>
          <LogInForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
