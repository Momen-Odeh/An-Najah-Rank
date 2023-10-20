import React, { useState } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";
import handelStateChanges from "../../Utils/handelStateChanges";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "react-spinners/ClipLoader";
import SettingsContext from "../../Utils/SettingsContext";
import { useContext } from "react";
import { validatePassword } from "../../Utils/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PasswordSettings = () => {
  const clasess = useStyles();
  const [cookies] = useCookies();
  const context = useContext(SettingsContext);
  const { loading, setLoading, updatePassword, setUpdatePassword } = context;
  const [errorMsg, setErrorMsg] = useState({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const handelUpdatePassword = () => {
    console.log(updatePassword);
    setErrorMsg({
      ...errorMsg,
      currentPassword: !validatePassword(updatePassword.currentPassword)
        ? "password must contain at least 6 characters"
        : null,
      newPassword: !validatePassword(updatePassword.newPassword)
        ? "password must contain at least 6 characters"
        : null,
      confirmPassword: !validatePassword(updatePassword.confirmPassword)
        ? "password must contain at least 6 characters"
        : null,
    });
    if (
      validatePassword(updatePassword.currentPassword) &&
      validatePassword(updatePassword.newPassword) &&
      validatePassword(updatePassword.confirmPassword)
    ) {
      if (updatePassword.newPassword === updatePassword.confirmPassword) {
        setLoading(true);
        axios
          .put(
            "http://127.0.0.1:5000/updatePasswordSettings?token=" +
              cookies.token,
            {
              ...updatePassword,
            }
          )
          .then((response) => {
            console.log(response.data);
            setUpdatePassword({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            toast.success("password updated successfully", {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.log("Error", error);
            if (
              error.response.data.message === "current password not correct."
            ) {
              setErrorMsg({
                ...errorMsg,
                currentPassword: "current password not correct",
              });
            } else {
              toast.error(error.response.data.message, {
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
          });
        setLoading(false);
      } else {
        setErrorMsg({
          ...errorMsg,
          newPassword: "new password and confirm password not matched",
          confirmPassword: "new password and confirm password not matched",
        });
      }
    }
  };
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Text
            text={"Change Password"}
            fontFamily="Open Sans"
            size="20px"
            wegiht="600"
            color="#191e35"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <InputFiledRank
            type={"password"}
            label={"Current Password"}
            id={"currentPassword"}
            value={updatePassword.currentPassword}
            name={"currentPassword"}
            msg={errorMsg.currentPassword}
            onChange={(e) =>
              handelStateChanges(e, updatePassword, setUpdatePassword)
            }
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRank
            type={"password"}
            label={"New Password"}
            id={"newPassword"}
            value={updatePassword.newPassword}
            name={"newPassword"}
            msg={errorMsg.newPassword}
            onChange={(e) =>
              handelStateChanges(e, updatePassword, setUpdatePassword)
            }
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRank
            type={"password"}
            label={"Confirm Password"}
            id={"confirmPassword"}
            value={updatePassword.confirmPassword}
            name={"confirmPassword"}
            msg={errorMsg.confirmPassword}
            onChange={(e) =>
              handelStateChanges(e, updatePassword, setUpdatePassword)
            }
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className={clasess.SaveChanges}>
        <Col>
          {loading && <Loader size={50} color="#191e35" speedMultiplier={1} />}
        </Col>
        <Col>
          <ButtonRank
            text={"Update Password"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            onClick={handelUpdatePassword}
            disabled={loading}
          />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default PasswordSettings;
