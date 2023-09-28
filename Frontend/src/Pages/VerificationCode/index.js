import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import ButtonRegister from "../../Components/ButtonRegister";
import AuthCode from "react-auth-code-input";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
const VarificationCode = () => {
  const classes = useStyles();
  const setActiveTab = useOutletContext();
  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [code, setCode] = useState(null);
  const changeCode = (res) => {
    setCode(res);
  };
  const handelVerifyBtn = () => {
    console.log(code);
  };
  return (
    <div className={classes.center}>
      <Container className={`${classes.Container}`}>
        <Row className={`${classes.Row}  mb-4`}>
          <Col className={classes.Col}>
            <TextRegister
              text={"Verification Code"}
              color="#000000"
              height="45px"
              size="30px"
              wegiht="500"
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2`}>
          <Col className={classes.Col}>
            <TextRegister
              text={"Enter your 4 digits code that you received on your email."}
              color="#000000"
              height="24px"
              size="16px"
              wegiht="400"
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-4`}>
          <Col>
            <AuthCode
              containerClassName={classes.AuthCode}
              inputClassName={classes.AuthCodeCell}
              length={4}
              onChange={changeCode}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="Verify"
              to={"/new-password"}
              onClick={handelVerifyBtn}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} `}>
          <Col className={classes.Col}>
            <TextRegister
              text={"If you didn't receive a code! "}
              color="#000000"
              height="24px"
              size="16px"
              wegiht="400"
            />
            <TextRegister
              text={"Resend"}
              color="#0C21C1"
              height="24px"
              size="16px"
              wegiht="400"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VarificationCode;
