import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import Tags from "../Tags";
import ButtonRank from "../ButtonRank";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import InputFiledRank from "../InputFiledRank";
import useStyle from "./style";
import LoaderRank from "../LoaderRank";
import { toastError } from "../../Utils/toast";
const CreateChallengeDetails = ({ operation, data }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [details, setDetails] = useState({
    difficulty: "Easy",
    name: "",
    description: "",
    problemStatement: "",
    inputFormat: "",
    constraints: "",
    outputFormat: "",
    tags: [],
  });
  const [errorMsg, setErrorMsg] = useState({
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
  });
  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value } = e.target;
      // console.log(details);
      setDetails({ ...details, [name]: value });
    } else {
      setDetails({ ...details, [nameVal]: val });
      // console.log(details);
    }
  };
  const handleClick = async () => {
    let challenge = {
      difficulty: details.difficulty,
      name: details.name,
      description: details.description,
      problem_statement: details.problemStatement,
      input_format: details.inputFormat,
      constraints: details.constraints,
      output_format: details.outputFormat,
      tags: details.tags.length === 0 ? null : details.tags,
    };
    setErrorMsg({
      name:
        challenge.name.length < 3
          ? "challenge name must contain at least 3 characters"
          : null,
      description:
        challenge.description.length === 0
          ? "please enter the challenge description"
          : null,
      problemStatement:
        challenge.problem_statement.length === 0
          ? "please enter the challenge problem statement"
          : null,
      inputFormat:
        challenge.input_format.length === 0
          ? "please enter the challenge input format"
          : null,
      constraints:
        challenge.constraints.length === 0
          ? "please enter the challenge constraints"
          : null,
      outputFormat:
        challenge.output_format.length === 0
          ? "please enter the challenge output format"
          : null,
    });

    if (
      challenge.name.length >= 3 &&
      challenge.description.length !== 0 &&
      challenge.problem_statement.length !== 0 &&
      challenge.input_format.length !== 0 &&
      challenge.constraints.length !== 0 &&
      challenge.output_format.length !== 0
    ) {
      setLoading(true);
      try {
        if (operation === "create") {
          const response = await axios.post("/challenges", challenge);
          challenge = {
            ...challenge,
            tags:
              details.tags.length === 0 ? null : JSON.stringify(details.tags),
          };
          const params = new URLSearchParams(challenge);
          const res = await axios.get("/challenge_id?" + params.toString());
          navigate(`/administration/challenges/${res.data.message}/test-cases`);
        } else {
          const response = await axios.put(`/challenges/${id}`, challenge);
          navigate(`/administration/challenges/${id}/test-cases`);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toastError(error.response.data.message);
        setLoading(false);
      }
    }
  };
  const classes = useStyle();
  return (
    <Container fluid>
      {/*  */}
      <Row className="mb-3 mt-5">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Difficulty"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            disabled={loading}
            name="difficulty"
            onChange={handleChange}
            value={details.difficulty}
            options={[
              {
                value: "Easy",
                text: "Easy",
              },
              {
                value: "Medium",
                text: "Medium",
              },
              {
                value: "Hard",
                text: "Hard",
              },
              {
                value: "Advanced",
                text: "Advanced",
              },
              {
                value: "Expert",
                text: "Expert",
              },
            ]}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="text"
            name="name"
            id="input"
            onChange={handleChange}
            value={details.name}
            disabled={loading}
            msg={errorMsg.name}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Description"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            as="textarea"
            name="description"
            id="textarea"
            rows={3}
            onChange={handleChange}
            value={details.description}
            disabled={loading}
            msg={errorMsg.description}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Problem Statement"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"problemStatement"}
            text={details.problemStatement}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.problemStatement}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Input Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"inputFormat"}
            text={details.inputFormat}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.inputFormat}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Constraints"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"constraints"}
            text={details.constraints}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.constraints}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Output Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"outputFormat"}
            text={details.outputFormat}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.outputFormat}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Tags"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <Tags
            tags={details.tags}
            handleChange={handleChange}
            disabled={loading}
          />
        </Col>
      </Row>

      {loading && (
        <Row>
          <Col xs={"auto"} className={classes.Loaderspace}></Col>
          <Col className={classes.Loader}>
            <LoaderRank loading={loading} />
          </Col>
        </Row>
      )}
      <Row className="mt-5">
        <Col Col xs={"auto"} className={classes.TitleFiled}></Col>
        <Col className={classes.ActionBtns}>
          <ButtonRank
            text={"Cancel Changes"}
            onClick={() => navigate("/administration/challenges")}
            disabled={loading}
          />
          <ButtonRank
            onClick={handleClick}
            text={"Save Changes"}
            disabled={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateChallengeDetails;
