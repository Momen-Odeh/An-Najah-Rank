import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import InputFiledRegister from "../../Components/InputFiledRegister";
import { TfiLock } from "react-icons/tfi";
import ButtonRegister from "../../Components/ButtonRegister";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import { useOutletContext } from "react-router-dom";
import handelStateChanges from "../../Utils/handelStateChanges";
import AlertComponent from "../../Components/Alert";
import Loader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

import axios from "axios";
import { validatePassword } from "../../Utils/Validation";
const NewPassword = () => {
  const classes = useStyles();
  const setActiveTab = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    newPassword: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);

  const handelPasswordUpdateButton = () => {
    setErrorMsg({
      newPassword: !validatePassword(newPassword.newPassword)
        ? "Password must contain at least 6 characters"
        : null,
      confirmPassword: !validatePassword(newPassword.confirmPassword)
        ? "Password must contain at least 6 characters"
        : null,
    });
    if (
      validatePassword(newPassword.newPassword) &&
      validatePassword(newPassword.confirmPassword)
    ) {
      if (newPassword.newPassword === newPassword.confirmPassword) {
        console.log(22222222222);
        setLoading(true);
        axios
          .put("http://127.0.0.1:5000/updatePassword", {
            email: sessionStorage.getItem("email"),
            newPassword: newPassword.newPassword,
            confirmPassword: newPassword.confirmPassword,
          })
          .then((resp) => {
            if (resp.status === 200) {
              sessionStorage.clear();
              navigate("/log-in");
            }
            setLoading(false);
          })
          .catch((err) => {
            if (err.response.data.msg === "miss match passwords") {
              setErrorMsg({
                newPassword: !validatePassword(newPassword.newPassword)
                  ? "Password must contain at least 6 characters"
                  : null,
                confirmPassword: !validatePassword(newPassword.confirmPassword)
                  ? "Password must contain at least 6 characters"
                  : null,
              });
            } else {
              toast.error(err.response.data.error, {
                position: "bottom-left",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            setLoading(false);
          });
      } else {
        setErrorMsg({
          newPassword: "new password and confirm password not matched",
          confirmPassword: "new password and confirm password not matched",
        });
      }
    }
  };
  return sessionStorage?.event ? ( //Gard for the new password
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
              msg={errorMsg.newPassword}
              disabled={loading}
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
              msg={errorMsg.confirmPassword}
              onChange={(e) =>
                handelStateChanges(e, newPassword, setNewPassword)
              }
              disabled={loading}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-3 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="PASSWORD UPDATE"
              disabled={loading}
              onClick={handelPasswordUpdateButton}
            />
          </Col>
        </Row>
        {loading && (
          <Row>
            <Col className={classes.LoaderCol}>
              <Loader size={50} color="#191e35" speedMultiplier={1} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default NewPassword;
