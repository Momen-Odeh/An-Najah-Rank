import React, { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";
import InputFiledRegister from "../InputFiledRegister";
import { Col, Container, Form, Row } from "react-bootstrap";
import TextRegister from "../Text";
import ButtonRegister from "../ButtonRegister";
import useStyles from "./style";
import { Link, useNavigate } from "react-router-dom";
import handelStateChanges from "../../Utils/handelStateChanges";
import Text from "../Text";
import Axios from "axios";
import {
  validateEmail,
  validatePassword,
  validateUniversityNumber,
  validateFullName,
} from "../../Utils/Validation";
import Loader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const SignUpForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupValue, setSignupValue] = useState({
    email: "",
    fullName: "",
    universityNumber: "",
    password: "",
    confirmPassword: "",
    isProfessor: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    email: null,
    fullName: null,
    universityNumber: null,
    password: null,
    confirmPassword: null,
  });

  const handelSignUpButton = async () => {
    console.log(signupValue);
    setLoading(true);
    setErrorMsg({
      email: !validateEmail(signupValue.email) ? "Invalid Email" : null,
      fullName: !validateFullName(signupValue.fullName)
        ? "Full Names must contain at least 3 characters"
        : null,
      universityNumber: !validateUniversityNumber(signupValue.universityNumber)
        ? "The university number must consist of digits and contain at least three digits."
        : null,
      password: !validatePassword(signupValue.password)
        ? "Password must contain at least 6 characters"
        : null,
      confirmPassword: !validatePassword(signupValue.confirmPassword)
        ? "Password must contain at least 6 characters"
        : null,
    });
    if (
      validateEmail(signupValue.email) &&
      validateFullName(signupValue.fullName) &&
      validateUniversityNumber(signupValue.universityNumber) &&
      validatePassword(signupValue.password) &&
      validatePassword(signupValue.confirmPassword)
    ) {
      if (signupValue.password !== signupValue.confirmPassword) {
        setErrorMsg({
          ...errorMsg,
          email: null,
          fullName: null,
          universityNumber: null,
          password: "new password and confirm password not matched",
          confirmPassword: "new password and confirm password not matched",
        });
        setLoading(false);
        return;
      } else {
        setErrorMsg({
          ...errorMsg,
          email: null,
          fullName: null,
          universityNumber: null,
          password: null,
          confirmPassword: null,
        });
      }
      try {
        console.log(signupValue);
        const data = {
          universityNumber: signupValue.universityNumber,
          email: signupValue.email,
          fullName: signupValue.fullName,
          password: signupValue.password,
          role: signupValue.isProfessor ? "professor" : "student",
        };
        console.log(data);
        const response = await Axios.post(
          "http://localhost:5000/register",
          data
        );
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("event", "register");
        navigate("/verification-code");
      } catch (error) {
        if (error.response?.status === 409) {
          if (error.response?.data.message.includes("@")) {
            setErrorMsg({
              ...errorMsg,

              email: "Email already exist",
              universityNumber: null,
              password: null,
              confirmPassword: null,
            });
          } else {
            setErrorMsg({
              ...errorMsg,
              email: null,
              universityNumber: "University Number already exist",
              password: null,
              confirmPassword: null,
            });
          }
        } else {
          error.response?.data.message
            ? toast.error(error.response.data.message, {
                position: "bottom-left",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            : toast.error("No connection with backend", {
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
      }
    }
    setLoading(false);
  };
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
            name={"email"}
            msg={errorMsg.email}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
            disabled={loading}
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
            name={"fullName"}
            msg={errorMsg.fullName}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
            disabled={loading}
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
            name={"universityNumber"}
            msg={errorMsg.universityNumber}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
            disabled={loading}
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
            name={"password"}
            msg={errorMsg.password}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
            disabled={loading}
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
            name={"confirmPassword"}
            msg={errorMsg.confirmPassword}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="mb-5 ms-2">
        <Col>
          <Form.Group controlId="isProfessor">
            <Form.Check
              type="checkbox"
              size={"lg"}
              name="isProfessor"
              checked={signupValue.isProfessor}
              onChange={(e) =>
                handelStateChanges(e, signupValue, setSignupValue)
              }
              disabled={loading}
            />
            <Form.Label className={classes.labelForm}>
              {" "}
              <Text text={"Sign up as professor"} color="#595c5f" />
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
      {loading && (
        <Row>
          <Col className={classes.LoaderCol}>
            <Loader size={50} color="#191e35" speedMultiplier={1} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <ButtonRegister
            text="Register"
            onClick={handelSignUpButton}
            disabled={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
