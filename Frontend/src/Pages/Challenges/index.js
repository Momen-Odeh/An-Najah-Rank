import React, { useEffect, useState } from "react";
import CreateChallengeDetails from "../../Components/CreateChallengeDetails";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Col, Container, Row } from "react-bootstrap";
import TestCases from "../../Components/TestCases";
import { useParams } from "react-router-dom";
import Axios from "axios";
import useStyles from "./style";
const Challenges = () => {
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
  const [testCasesData, setTestCasesData] = useState([]);
  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/challenge/" + id)
      .then((res) => {
        console.log(res);
        setDetails({
          difficulty: res.data.difficulty,
          name: res.data.name,
          description: res.data.description,
          problemStatement: res.data.problem_statement,
          inputFormat: res.data.inputFormat,
          constraints: res.data.constraints,
          outputFormat: res.data.outputFormat,
          tags: res.data.tags,
        });
        setTestCasesData(
          res.data.testCases.map((item, index) => ({
            id: item.id,
            order: index,
            input: item.input_data,
            output: item.output_data,
            sample: item.is_sample,
            strength: item.strength,
            explanation: item.explanation,
            isSelected: false,
          }))
        );
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const tabs = [
    {
      title: "Details",
      eventKey: "Details",
      TabComponent: (
        <CreateChallengeDetails operation={"update"} data={details} />
      ),
      urlPattern: `/administration/challenges/${id}/details`,
    },
    {
      title: "TestCases",
      eventKey: "TestCases",
      TabComponent: (
        <TestCases operation={"update"} testCasesData={testCasesData} />
      ),
      urlPattern: `/administration/challenges/${id}/test-cases`,
    },
  ];
  const path = [
    { title: "Manage Challenges", url: "/administration/challenges" },
    { title: details.name, url: "#" },
  ];
  const classes = useStyles();
  return (
    <Container fluid className={`${classes.Container}`}>
      <Row className="mb-2">
        <Col>
          <Breadcrumbs path={path} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={details.name}
            size="26px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <ChallengeTabs ListTabs={tabs} />
        </Col>
      </Row>
    </Container>
  );
};

export default Challenges;
