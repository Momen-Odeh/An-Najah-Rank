import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../../Components/Text";
import ButtonRegister from "../../Components/ButtonRegister";
import AuthCode from "react-auth-code-input";
import { Navigate, useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../Components/Alert";
import Loader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const VarificationCode = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ msg: "", value: false });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
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

    setErrorMsg(!(code.length === 6) ? "please fill all cells" : null);
    if (code.length === 6) {
      setLoading(true);
      axios
        .post("/verfiyCode", {
          email: sessionStorage.getItem("email"),
          code: code,
        })
        .then((resp) => {
          if (resp.status === 200) {
            if (sessionStorage.getItem("event") === "forget Password")
              navigate("/new-password");
            else if (sessionStorage.getItem("event") === "register") {
              axios
                .put("/userStatusAuth", {
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
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data.msg === "invalid access") {
            setErrorMsg("Incorrect Code, Try again");
          } else if (err.response.data.msg === "invalid TTL") {
            setErrorMsg("code has expired time, try again");
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
    }
  };
  return sessionStorage?.event ? ( //Gard for the Verification code
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
        <Row className={`${classes.Row} mb-3`}>
          <Col>
            <AuthCode
              containerClassName={classes.AuthCode}
              inputClassName={classes.AuthCodeCell}
              length={6}
              onChange={changeCode}
              disabled={loading}
            />
          </Col>
        </Row>
        {errorMsg && (
          <Row className={`${classes.RowMsg} mb-2`}>
            <Col>
              <p className={classes.msg}>* {errorMsg}</p>
            </Col>
          </Row>
        )}
        <Row className={`${classes.Row} mb-2 `}>
          <Col className={classes.Col}>
            <ButtonRegister
              text="Verify"
              // to={"/new-password"}
              onClick={handelVerifyBtn}
              disabled={loading}
            />
          </Col>
        </Row>
        {/* <Row className={`${classes.Row} mb-2`}>
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
        </Row> */}
        <Row className={`${classes.Row} `}>
          <Col className={classes.Col}>
            <AlertComponent
              message={alert.msg}
              variant="warning"
              show={alert.value}
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

export default VarificationCode;
