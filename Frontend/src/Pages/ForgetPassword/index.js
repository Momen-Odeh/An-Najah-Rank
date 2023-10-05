import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import InputFiledRegister from "../../Components/InputFiledRegister";
import { TfiEmail } from "react-icons/tfi";
import ButtonRegister from "../../Components/ButtonRegister";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import handelStateChanges from "../../Utils/handelStateChanges";
import axios from "axios";
import AlertComponent from "../../Components/Alert";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const setActiveTab = useOutletContext();
  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [email, setEmail] = useState({ value: "" });
  const [alert, setAlert] = useState({ msg: "", value: false });
  const handelResetPasswordButton = () => {
    console.log(email);
    axios
      .post("http://127.0.0.1:5000/forgetPassword", {
        email: email.value,
      })
      .then((resp) => {
        console.log(resp.status);
        if (resp.status === 200) {
          sessionStorage.setItem("email", email.value);
          sessionStorage.setItem("event", "forget Password");
          navigate("/verification-code");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setAlert({ value: true, msg: "Not found email please try again" });
      });
  };
  return (
    <div className={classes.center}>
      <Container className={`${classes.Container}`}>
        <Row className={`${classes.Row}  mb-4`}>
          <Col className={classes.Col}>
            <TextRegister
              text={"Forget Password"}
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
              text={
                "No Problem! Enter your email below and we will send you an Code with instruction to reset your password."
              }
              color="#000000"
              height="24px"
              size="16px"
              wegiht="400"
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-4`}>
          <Col>
            <InputFiledRegister
              // label="Email: "
              Icon={TfiEmail}
              placeHolder="Enter your Email"
              type="Email"
              name={"value"}
              onChange={(e) => handelStateChanges(e, email, setEmail)}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="Reset Password"
              // to={"/verification-code"}
              onClick={handelResetPasswordButton}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <TextRegister
              text={"Back to "}
              color="#000000"
              height="24px"
              size="16px"
              wegiht="400"
            />
            <Link to={"/log-in"} className={classes.Link}>
              <TextRegister
                text={"Login"}
                color="#0C21C1"
                height="24px"
                size="16px"
                wegiht="400"
              />
            </Link>
          </Col>
        </Row>
        <Row className={`${classes.Row} `}>
          <Col className={classes.Col}>
            <AlertComponent
              message={alert.msg}
              variant="warning"
              show={alert.value}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPassword;
