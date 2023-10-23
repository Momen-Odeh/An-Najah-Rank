import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import Tags from "../Tags";
import ButtonRank from "../ButtonRank";
import Axios from "axios";
import AlertComponent from "../Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
const Details = ({ operation, data }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({
    difficulty: "Easy",
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
    tags: [],
  });
  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value } = e.target;
      console.log(details);
      setDetails({ ...details, [name]: value });
    } else {
      setDetails({ ...details, [nameVal]: val });
      console.log(details);
    }
  };
  const handleClick = async () => {
    setShowAlert(false);
    let thereError = false;
    let challenge = {
      difficulty: details.difficulty,
      name: details.name,
      description: details.description,
      problem_statement: details.problemStatement,
      input_format: details.inputFormat,
      constraints: details.constraints,
      output_format: details.outputFormat,
      tags: details.tags.length === 0 ? null : details.tags,
      token: cookies?.token,
    };
    try {
      if (!details.name) throw new Error("should fill the name");
      else if (!details.description)
        throw new Error("should fill the description");
      else if (!details.problemStatement)
        throw new Error("should fill the problem statement");
    } catch (error) {
      setAlertData({ message: error.message, variant: "warning" });
      setShowAlert(true);
      thereError = true;
    }
    if (!thereError) {
      try {
        if (operation === "create") {
          const response = await Axios.post(
            "http://localhost:5000/challenges",
            challenge
          );
          challenge = {
            ...challenge,
            tags:
              details.tags.length === 0 ? null : JSON.stringify(details.tags),
          };
          const params = new URLSearchParams(challenge);
          const res = await Axios.get(
            "http://localhost:5000/challenge_id?" + params.toString()
          );
          navigate(`/administration/challenges/${res.data.message}/test-cases`);
        } else {
          const response = await Axios.put(
            `http://localhost:5000/challenges/${id}`,
            challenge
          );
          navigate(`/administration/challenges/${id}/test-cases`);
        }
        console.log(challenge);
      } catch (error) {
        setAlertData({
          message: error.response.data.message,
          variant: "danger",
        });
        setShowAlert(true);
      }
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Difficulty"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Select
              name="difficulty"
              onChange={handleChange}
              value={details.difficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              id="input"
              onChange={handleChange}
              value={details.name}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Description"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="description"
              id="textarea"
              rows={3}
              onChange={handleChange}
              value={details.description}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Problem Statement"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <TextEditor
            name={"problemStatement"}
            text={details.problemStatement}
            handleChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Input Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <TextEditor
            name={"inputFormat"}
            text={details.inputFormat}
            handleChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Constraints"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <TextEditor
            name={"constraints"}
            text={details.constraints}
            handleChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Output Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <TextEditor
            name={"outputFormat"}
            text={details.outputFormat}
            handleChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Tags"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <Tags tags={details.tags} handleChange={handleChange} />
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
        <Col md={2}></Col>
        <Col md={8} className="d-flex justify-content-end">
          <ButtonRank
            text={"Cancel Changes"}
            onClick={() => navigate("/administration/challenges")}
          />
          <span className="m-1"></span>
          <ButtonRank
            onClick={handleClick}
            text={"Save Changes"}
            backgroundColor="#1cb557"
            hoverBackgroundColor="green"
            color="white"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
