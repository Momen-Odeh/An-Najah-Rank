import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useStyles from "./style";
import RegistrationShow from "../../Components/RegistrationShow";
import code from "./images/code.png";
import SignUpForm from "../../Components/SignUpForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { routeNames } from "../../Utils/Utils";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../../Components/Loader";
const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const setActiveTab = useOutletContext();
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    if (token) {
      axios
        .get("/checkToken")
        .then((res) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setLoadingPage(false);
        });
    } else setLoadingPage(false);
    setActiveTab(routeNames.LOG_IN);
  }, []);
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row
        className={`${classes.Row} align-items-center justify-content-center`}
      >
        <Col xs={12} md={6} className={classes.ColLeft}>
          <SignUpForm />
        </Col>
        <Col xs={3} md={6} className={`${classes.ColRight}`}>
          <RegistrationShow
            img={code}
            title={"Sign Up to An-Najah Rank"}
            subTitle={"make your future"}
            SignUp
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
