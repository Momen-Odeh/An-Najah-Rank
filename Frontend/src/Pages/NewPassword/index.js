import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import InputFiledRegister from "../../Components/InputFiledRegister";
import { TfiLock } from "react-icons/tfi";
import ButtonRegister from "../../Components/ButtonRegister";
import { Link, useNavigate } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import { useOutletContext } from "react-router-dom";
import handelStateChanges from "../../Utils/handelStateChanges";
import AlertComponent from "../../Components/Alert";
import axios from "axios";
const NewPassword = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ msg: "", value: false });
  const setActiveTab = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handelPasswordUpdateButton = () => {
    console.log(newPassword);
    axios
      .put("http://127.0.0.1:5000/updatePassword", {
        email: sessionStorage.getItem("email"),
        newPassword: newPassword.newPassword,
        confirmPassword: newPassword.confirmPassword,
      })
      .then((resp) => {
        if (resp.status == 200) {
          sessionStorage.clear();
          navigate("/log-in");
        }
      })
      .catch((err) => {
        if (err.response.data.msg === "miss match passwords") {
          setAlert({ value: true, msg: "miss match passwords" });
        } else {
          setAlert({ value: true, msg: "" + err });
        }
      });
  };
  return (
    <div className={classes.center}>
      <Container className={`${classes.Container}`}>
        <Row className={`${classes.Row}  mb-4`}>
          <Col className={classes.Col}>
            <TextRegister
              text={"New Password"}
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
                "Set the new password for your account so you can login and access all featuress."
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
              label="New Password"
              Icon={TfiLock}
              placeHolder="Enter New Password"
              type="password"
              name={"newPassword"}
              onChange={(e) =>
                handelStateChanges(e, newPassword, setNewPassword)
              }
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-4`}>
          <Col>
            <InputFiledRegister
              label="Confirm Password"
              Icon={TfiLock}
              placeHolder="Enter Confirm Password"
              type="password"
              name={"confirmPassword"}
              onChange={(e) =>
                handelStateChanges(e, newPassword, setNewPassword)
              }
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="PASSWORD UPDATE"
              // to={"/log-in"}
              onClick={handelPasswordUpdateButton}
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

export default NewPassword;
