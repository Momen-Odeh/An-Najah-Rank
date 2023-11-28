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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { validateEmail } from "../../Utils/Validation";
import Loader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const ForgetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const setActiveTab = useOutletContext();
  const [errorMsg, setErrorMsg] = useState({
    email: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(routeNames.LOG_IN);
  }, []);
  const [email, setEmail] = useState({ value: "" });
  const handelResetPasswordButton = async () => {
    setErrorMsg({
      email: !validateEmail(email.value) ? "Invalid Email" : null,
    });
    console.log();
    if (validateEmail(email.value)) {
      setLoading(true);
      axios
        .post("/forgetPassword", {
          email: email.value,
        })
        .then((respons) => {
          if (respons.status === 200) {
            sessionStorage.setItem("email", email.value);
            sessionStorage.setItem("event", "forget Password");
            navigate("/verification-code");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
          if (error.response?.status === 404) {
            setErrorMsg({ email: "Not found email" });
          } else {
            toast.error(error.response.data.error, {
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
    }
  };
  return !cookies?.token ? ( // Gard for forget passoed
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
              Icon={TfiEmail}
              placeHolder="Enter your Email"
              type="Email"
              name={"value"}
              onChange={(e) => handelStateChanges(e, email, setEmail)}
              disabled={loading}
              msg={errorMsg.email}
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="Reset Password"
              onClick={handelResetPasswordButton}
              disabled={loading}
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

export default ForgetPassword;
