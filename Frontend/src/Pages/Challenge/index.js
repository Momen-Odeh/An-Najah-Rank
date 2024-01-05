import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "../../Components/Breadcrumbs";
import TextRegister from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ProblemDescription from "../../Components/ProblemDescription";
import LeadboardTab from "../../Components/LeadboardTab";
import useStyles from "./style";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ChallengeContext from "../../Utils/ChallengeContext";
import { toastError } from "../../Utils/toast";
import Submission from "../../Components/Submission";
import SubmissionProfessor from "../../Components/SubmissionProfessor";
import Loader from "../../Components/Loader";
const Challenge = () => {
  const classes = useStyles();
  const { id, contestId, challengeId, submissionId } = useParams();
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState({});
  const [testCases, setTestCases] = useState({
    show: false,
    tabContent: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const tabContent = [
    {
      eventKey: "Problem",
      title: "Problem",
      TabComponent: <ProblemDescription />,
      urlPattern: `/courses/${id}/contests/${contestId}/challenges/${challengeId}/problem`,
    },
    {
      eventKey: "Submissions",
      title: "Submissions",
      TabComponent: <SubmissionProfessor />,
      urlPattern: `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions`,
      innerTabComponent: <Submission />,
      innerTabUrl: `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/${submissionId}`,
    },
    {
      eventKey: "Leaderboard",
      title: "Leaderboard",
      TabComponent: <LeadboardTab />,
      urlPattern: `/courses/${id}/contests/${contestId}/challenges/${challengeId}/leaderboard`,
    },
  ];
  useEffect(() => {
    axios
      .get("/challenge/" + challengeId, {
        params: { courseId: id, contestId: contestId },
      })
      .then((res) => {
        setChallengeData(res?.data);
        console.log(res);
        setLoadingPage(false);
      })
      .catch((e) => {
        console.log(e.response);
        if (e?.response?.status === 401) {
          //***********************guard done***************************
          if (e?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        } else {
          setLoadingPage(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingPage(false);
      });
  }, []);
  return loadingPage ? (
    <Loader />
  ) : (
    <ChallengeContext.Provider
      value={{
        challengeData: challengeData,
        testCases: { val: testCases, setVal: setTestCases },
        loading: loading,
        setLoading: setLoading,
      }}
    >
      <Container fluid className={classes.Container}>
        <Row className={`mt-2 ${classes.maxWidth}`}>
          <Col>
            <Breadcrumbs />
          </Col>
        </Row>
        <Row className={`mb-3 mt-1 ${classes.maxWidth}`}>
          <Col>
            <TextRegister
              text={challengeData.name}
              size="36px"
              wegiht="500"
              height="40px"
            />
          </Col>
        </Row>
        <Row className={`mb-4 ${classes.maxWidth}`}>
          <Col>
            <ChallengeTabs ListTabs={tabContent} />
          </Col>
        </Row>
      </Container>
    </ChallengeContext.Provider>
  );
};

export default Challenge;
