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

const Challenge = ({}) => {
  const clasess = useStyles();
  const { id, contestId, challengeId } = useParams();
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState({});
  const [testCases, setTestCases] = useState({
    show: false,
    tabContent: [],
  });
  const [loading, setLoading] = useState(false);
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
      .get("http://127.0.0.1:5000/challenge/" + challengeId)
      .then((res) => {
        setChallengeData(res.data);
        console.log(res);
        // const ArrTest = res.data.testCases.map((item, index) => {
        //   return {
        //     eventKey: "TestCase " + index,
        //     title: (
        //       <span>
        //         TestCase {index}{" "}
        //         {/* <FaCheck className={`${clasess.Icon} ${clasess.IconPass}`} /> */}
        //       </span>
        //     ),
        //     TabComponent: (
        //       <TestCaseProblem
        //         input={item.input_data}
        //         outputExpect={item.output_data}
        //         outputReal={50}
        //         compilerMsg={"Correct Answer"}
        //       />
        //     ),
        //   };
        // });
        // console.log(ArrTest);
        // setTestCases({
        //   ...testCases,
        //   tabContent: ArrTest,
        // });
      })
      .catch((e) => {
        console.log(e.response);
        // navigate("/NotFound");
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
          <Col>
            <ChallengeTabs ListTabs={tabContent} />
          </Col>
        </Row>
      </Container>
    </ChallengeContext.Provider>
  );
};

export default Challenge;
