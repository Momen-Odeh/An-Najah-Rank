import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import ButtonRegister from "../../Components/ButtonRegister";
import AuthCode from "react-auth-code-input";
import { useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../Components/Alert";
const VarificationCode = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ msg: "", value: false });
  const setActiveTab = useOutletContext();
  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [code, setCode] = useState("");
  const changeCode = (res) => {
    setCode(res);
  };
  const handelVerifyBtn = () => {
    console.log(code);
    axios
      .post("http://127.0.0.1:5000/verfiyCode", {
        email: sessionStorage.getItem("email"),
        code: code,
      })
      .then((resp) => {
        if (resp.status === 200) {
          // axios
          //   .post("http://127.0.0.1:5000/emailCodeVerification", {
          //     email: sessionStorage.getItem("email"),
          //   })
          //   .then((resp) => {
          //     console.log(resp);
          //     navigate("/new-password");
          //   })
          //   .catch((err) => {
          //     setAlert({
          //       value: true,
          //       msg: "there is error:" + err,
          //     });
          //   });
          if (sessionStorage.getItem("event") === "forget password")
            navigate("/new-password");
          else if (sessionStorage.getItem("event") === "register") {
            axios
              .put("http://127.0.0.1:5000/userStatusAuth", {
                email: sessionStorage.getItem("email"),
              })
              .then((resp) => {
                sessionStorage.clear();
                navigate("/log-in");
              })
              .catch((err) => {
                setAlert({
                  value: true,
                  msg: "" + err,
                });
              });
          }
        }
      })
      .catch((err) => {
        if (err.response.data.msg === "invalid access") {
          setAlert({
            value: true,
            msg: "Incorrect Code, Try again",
          });
        } else if (err.response.data.msg === "invalid TTL") {
          setAlert({
            value: true,
            msg: "code has expired time, resend code again",
          });
        }
      });
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
              text={"Enter your code that you received on your email."}
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
              length={6}
              onChange={changeCode}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="Verify"
              // to={"/new-password"}
              onClick={handelVerifyBtn}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2`}>
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

export default VarificationCode;
