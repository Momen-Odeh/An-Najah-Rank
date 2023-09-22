import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../TextRegister";
import code from "./images/code.png";

const RegistrationShow = () => {
  const classes = useStyles();
  return (
    <Container fluid={true} className={classes.Container}>
      <Row className="mb-5">
        <Col>
          <img className={classes.imgBG} src={code} alt="Background" />
        </Col>
      </Row>
      <Row className="mb-0">
        <Col>
          <TextRegister
            text={"Sign in to An-Najah Rank"}
            color="#FFFFFF"
            height="60px"
            size="40px"
            wegiht="600"
          />
        </Col>
      </Row>
      <Row className="mb-5 ">
        <Col>
          <TextRegister
            text={"make your future"}
            color="#FFFFFF"
            height="30px"
            size="20px"
            wegiht="300"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationShow;
