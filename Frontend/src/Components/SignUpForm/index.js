import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";
import InputFiledRegister from "../InputFiledRegister";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../Text";
import ButtonRegister from "../ButtonRegister";
import useStyles from "./style";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const classes = useStyles();
  return (
    <Container className={`${classes.Container} `} fluid={true}>
      <Row className="mb-3">
        <Col>
          <TextRegister
            text={"Sign Up"}
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
            text={"If you already have an account register"}
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
          <Link to={"/log-in"} className={classes.Link}>
            <TextRegister
              text={"Login here !"}
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
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="Full Name"
            Icon={FiUser}
            placeHolder="Enter your Full Name"
            type="text"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="University Number"
            Icon={AiOutlineNumber}
            placeHolder="Enter your University Number"
            type="text"
          />
        </Col>
      </Row>
      <Row className="mb-4">
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
        <Col>
          <InputFiledRegister
            label="Confirm Password"
            Icon={TfiLock}
            placeHolder="Confirm your Password"
            type="password"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <ButtonRegister text="Register" to={"/verification-code"} />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
