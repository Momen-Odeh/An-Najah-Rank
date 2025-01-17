import React, { useEffect, useState } from "react";
import CreateChallengeDetails from "../../Components/CreateChallengeDetails";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Col, Container, Row } from "react-bootstrap";
import TestCases from "../../Components/TestCases";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStyles from "./style";
import { toastError } from "../../Utils/toast";
import Loader from "../../Components/Loader";
const Challenges = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedContests, setRelatedContests] = useState([]);
  const [details, setDetails] = useState({
    difficulty: "Easy",
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
    challengePrivacy: false,
    challengeLanguage: [],
    tags: [],
  });
  const [testCasesData, setTestCasesData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get("/challenge/" + id)
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
          challengePrivacy: res.data.challengePrivacy,
          challengeLanguage: res.data.challengeLanguage,
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
        setRelatedContests(res.data.relatedContests);
        setLoadingPage(false);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          //************* guard done ************************ */
          toastError("Invalid Access");
          navigate("/");
        } else setLoadingPage(false);
        console.log(e.response);
      });
  }, []);

  const tabs = [
    {
      title: "Details",
      eventKey: "Details",
      TabComponent: (
        <CreateChallengeDetails
          operation={"update"}
          data={details}
          setData={setDetails}
        />
      ),
      urlPattern: `/administration/challenges/${id}/details`,
    },
    {
      title: "TestCases",
      eventKey: "TestCases",
      TabComponent: (
        <TestCases
          operation={"update"}
          testCasesData={testCasesData}
          relatedContests={relatedContests}
        />
      ),
      urlPattern: `/administration/challenges/${id}/test-cases`,
    },
  ];

  const classes = useStyles();
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={`${classes.Container}`}>
      <Row className="mb-2">
        <Col>
          <Breadcrumbs />
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
