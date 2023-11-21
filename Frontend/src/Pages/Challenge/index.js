import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "../../Components/Breadcrumbs";
import TextRegister from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ProblemDescription from "../../Components/ProblemDescription";
import SubmitionTab from "../../Components/SubmitionTab";
import LeadboardTab from "../../Components/LeadboardTab";
import useStyles from "./style";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ChallengeContext from "../../Utils/ChallengeContext";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import TestCaseProblem from "../../Components/TestCaseProblem";
import { toastError } from "../../Utils/toast";
import Submission from "../../Components/Submission";

const Challenge = ({}) => {
  const clasess = useStyles();
  const { id, contestId, challengeId, submissionId } = useParams();
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState({});
  const [testCases, setTestCases] = useState({
    show: false,
    tabContent: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
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
      TabComponent: <SubmitionTab />,
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
    {
      eventKey: "Discussions",
      title: "Discussions",
      TabComponent: <h1>Tab4</h1>,
      urlPattern: `/courses/${id}/contests/${contestId}/challenges/${challengeId}/discussions`,
    },
  ];
  useEffect(() => {
    axios
      .get("/accessCourse", {
        params: {
          courseNumber: id,
        },
      })
      .then((response1) => {
        axios
          .get("/challenge/" + challengeId, { timeout: 1000000 })
          .then((res) => {
            setChallengeData(res.data);
            console.log(res);
            setLoadingPage(true);
          })
          .catch((e) => {
            console.log(e.response);
            if (e.response.status === 401) {
              navigate("/log-in");
              toastError("Invalid Access");
            }
          });
      })
      .catch((error1) => {
        console.log(error1);
        if (error1.response.status === 401) {
          toastError("Invalid Access");
          if (error1.response.data.Valid === undefined) {
            navigate("/log-in");
          } else {
            navigate("/");
          }
        }
      });
  }, []);
  return (
    <ChallengeContext.Provider
      value={{
        challengeData: challengeData,
        testCases: { val: testCases, setVal: setTestCases },
        loading: loading,
        setLoading: setLoading,
      }}
    >
      <Container fluid className={clasess.Container}>
        <Row className={`mt-2 ${clasess.maxWidth}`}>
          <Col>
            <Breadcrumbs />
          </Col>
        </Row>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>
            <TextRegister
              text={challengeData.name}
              size="36px"
              wegiht="500"
              height="40px"
            />
          </Col>
        </Row>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>{loadingPage && <ChallengeTabs ListTabs={tabContent} />}</Col>
        </Row>
      </Container>
    </ChallengeContext.Provider>
  );
};

export default Challenge;
