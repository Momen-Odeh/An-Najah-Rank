import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../Text";

const RegistrationShow = ({ img, title, subTitle, SignUp }) => {
  const classes = useStyles();
  return (
    <Container fluid={true} className={classes.Container}>
      <Row className="mb-5">
        <Col className={classes.ColImg}>
          <img
            className={SignUp ? classes.imgBG : classes.imgLogIn}
            src={img}
            alt="Background"
          />
        </Col>
      </Row>
      <Row className="mb-0">
        <Col>
          <TextRegister
            text={title}
            color="#FFFFFF"
            height="60px"
            size="40px"
            wegiht="600"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextRegister
            text={subTitle}
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
