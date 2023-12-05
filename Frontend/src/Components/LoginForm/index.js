import React, { useContext, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";
import InputFiledRegister from "../InputFiledRegister";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../Text";
import ButtonRegister from "../ButtonRegister";
import useStyles from "./style";
import { Link, useNavigate } from "react-router-dom";
import handelStateChanges from "../../Utils/handelStateChanges";
import axios from "axios";
import Cookies from "js-cookie";
import { validateEmail, validatePassword } from "../../Utils/Validation";
import { toast } from "react-toastify";
import Loader from "react-spinners/ClipLoader";
import userContext from "../../Utils/userContext";
const LogInForm = () => {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const { activeUser, setActiveUser } = useContext(userContext);
  const [errorMsg, setErrorMsg] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handelLoginButton();
    }
  };

  const handelLoginButton = async () => {
    setLoading(true);
    setErrorMsg({
      email: !validateEmail(loginValue.email) ? "Invalid Email" : null,
      password: !validatePassword(loginValue.password)
        ? "password must contain at least 6 characters"
        : null,
    });

    if (
      validatePassword(loginValue.password) &&
      validateEmail(loginValue.email)
    ) {
      try {
        const response = await axios.post("/login", {
          email: loginValue.email,
          password: loginValue.password,
        });
        console.log(response.data.user);
        setActiveUser(response.data.user);
        Cookies.set("token", response.data.token, {
          expires: 30,
          path: "/",
        });
        navigate("/");
      } catch (error) {
        if (error.response?.status === 404) {
          setErrorMsg({
            email: error.response.data.message,
            password: null,
          });
        } else if (error.response?.status === 401) {
          setErrorMsg({
            email: null,
            password: error.response.data.message,
          });
        } else
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
    setLoading(false);
  };
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
            name={"email"}
            onChange={(event) =>
              handelStateChanges(event, loginValue, setLoginValue)
            }
            onKeyDown={handleKeyPress}
            id={"Email"}
            msg={errorMsg.email}
            disabled={loading}
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
            name={"password"}
            onChange={(event) =>
              handelStateChanges(event, loginValue, setLoginValue)
            }
            id={"password"}
            msg={errorMsg.password}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-right">
          <Link to={"/forget-password"} className={classes.Link}>
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
      {loading && (
        <Row className="mb-3">
          <Col className={classes.LoaderCol}>
            <Loader size={50} color="#191e35" speedMultiplier={1} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <ButtonRegister
            text="Login"
            onClick={handelLoginButton}
            disabled={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;
