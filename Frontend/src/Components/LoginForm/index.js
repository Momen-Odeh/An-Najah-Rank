import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";
import InputFiledRegister from "../InputFiledRegister";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../TextRegister";
import ButtonRegister from "../ButtonRegister";
import useStyles from "./style";
import { Link } from "react-router-dom";

const LogInForm = () => {
  const classes = useStyles();
  return (
    <Container className={`${classes.Container} `} fluid={true}>
      <Row className="mb-3">
        <Col>
          <TextRegister
            text={"Sign in"}
            color="#000000"
            height="45px"
            size="30px"
            wegiht="500"
          />
        </Col>
      </Row>
      <Row className="mb-0">
        <Col>
          <TextRegister
            text={"If you don’t have an account register"}
            color="#000000"
            height="24px"
            size="16px"
            wegiht="400"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <TextRegister
            text={"You can "}
            color="#000000"
            height="24px"
            size="16px"
            wegiht="400"
          />
          <Link to={"/sign-up"} className={classes.Link}>
            <TextRegister
              text={"Register here !"}
              color="#0C21C1"
              height="24px"
              size="16px"
              wegiht="400"
            />
          </Link>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="Email"
            Icon={TfiEmail}
            placeHolder="Enter your email address"
            type="email"
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <InputFiledRegister
            label="Password"
            Icon={TfiLock}
            placeHolder="Enter your Password"
            type="password"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="text-right">
          <Link to={"/sign-up"} className={classes.Link}>
            <TextRegister
              text={"Forgot Password ?"}
              color="#4D4D4D"
              height="18px"
              size="12px"
              wegiht="300"
            />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonRegister text="Login" />
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;