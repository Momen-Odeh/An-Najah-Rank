import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import TextEditor from "../TextEditor";
import ButtonRank from "../ButtonRank";
import AlertComponent from "../Alert";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import moment from "moment"; 
import SuggestionsInput from '../SuggestionsInput'
const ContestsDetalis = ({ operation, data = null }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();
  const [details, setDetails] = useState({
    name: null,
    description: null,
    startTime: null,
    hasEndTime: false,
    endTime: null,
  });
  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
console.log(details);
  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value, type, checked, files } = e.target;
      const newValue =
        type === "checkbox" ? checked : type === "file" ? files[0] : value;
      setDetails({ ...details, [name]: newValue });
    } else {
      setDetails({ ...details, [nameVal]: val });
    }
  };
  const handleClick = async () => {
    setShowAlert(false);
    let thereError = false;
    const contest = {
      ...details,
      hasEndTime: !details.hasEndTime,
      startTime: moment(details.startTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime:details.endTime? moment(details.endTime).format("YYYY-MM-DD HH:mm:ss"):null,
      token: cookies?.token,
    };
    try {
      if (!details.name) {
        throw new Error("should enter context name");
      } else if (!details.startTime) {
        throw new Error("should enter start time");
      }
    } catch (error) {
      setAlertData({ message: error.message, variant: "warning" });
      setShowAlert(true);
      thereError = true;
    }
    if (!thereError) {
      try {
        if (operation === "create") {
          const response = await Axios.post(
            "http://localhost:5000/contests",
            contest
          );
          const params = new URLSearchParams(contest);
          const res = await Axios.get(
            "http://localhost:5000/contest_id?" + params.toString()
          );
          navigate(`/contests/${res?.data?.message}/challenges`);
        } else {
          const response = await Axios.put(
            `http://localhost:5000/contests/${id}`,
            contest
          );
          navigate(`/contests/${id}/challenges`);
        }
      } catch (error) {
        setAlertData({
          message: error?.response?.data?.message,
          variant: "danger",
        });
        setShowAlert(true);
      }
    }
  };
  return (
    <Container className={classes.Container}>
      <Row className="mb-2">
        <Col>
          <Text
            text={"Contest Details"}
            color="#39424e"
            size="24px"
            fontFamily="Open Sans"
            wegiht="bold"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Customize your contest by providing more information needed to create your landing page. Your contest will only be available to those who have access to the contest URL."
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Contest Name"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Form.Control
            type="text"
            className={classes.Form}
            name="name"
            onChange={handleChange}
            value={details.name}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Start Time"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Datetime
            onChange={(val) => handleChange(null, "startTime", val)}
            value={details.startTime}
            />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"End Time"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Datetime
            onChange={(val) => handleChange(null, "endTime", val)}
            value={details.endTime}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}></Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Form.Check
            className={classes.Check}
            type={"checkbox"}
            label={`This contest has no end time.`}
            name="hasEndTime"
            checked= {details.hasEndTime}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <hr />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Text
            text={"Landing Page Customization"}
            color="#39424e"
            size="24px"
            fontFamily="Open Sans"
            wegiht="bold"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Fill out this information to customize your contest landing page."
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Description"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col>
          <TextEditor
            name={"description"}
            text={details.description}
            handleChange={handleChange}
          />
        </Col>
      </Row>

      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          {showAlert && (
            <AlertComponent
              message={alertData.message}
              variant={alertData.variant}
            />
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className={classes.ButtonSelect}>
          <ButtonRank
            text={"Save Changes"}
            backgroundColor="rgb(46, 200, 102)"
            color="#fff"
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContestsDetalis;
