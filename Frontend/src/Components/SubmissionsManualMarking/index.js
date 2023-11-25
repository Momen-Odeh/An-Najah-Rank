import React, { useEffect, useState } from "react";
import ChallengeTabs from "../ChallengTabs";
import { ImCross } from "react-icons/im";
import { Col, Container, Row } from "react-bootstrap";
import SubmissionTab from "./SubmissionTab";
import { FaCheck } from "react-icons/fa";
import TestCaseProblem from "../TestCaseProblem";
import useStyle from "./style";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { toastError } from "../../Utils/toast";
const SubmissionsManualMarking = () => {
  const classes = useStyle();
  const { id, contestId, challengeId, studentId } = useParams();
  const [testCases, setTestCases] = useState([]);
  const sumStrength = testCases?.reduce(
    (sum, testCase) => sum + testCase.strength,
    0
  );
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [submissionId, setSubmissionId] = useState(
    studentSubmissions[0]?.submissionId
  );

  useEffect(() => {
    axios
      .get(
        `/submissions-manual-marking?courseId=${id}&contestId=${contestId}&challengeId=${challengeId}&studentUniversityNumber=${studentId}`
      )
      .then((res) => {
        setStudentSubmissions(res.data.submissions);
        setTestCases(res.data.testCases);
      })
      .catch((error) => {
        toastError(error);
      });
  }, []);

  useEffect(() => {
    setSubmissionId(studentSubmissions[0]?.submissionId);
  }, [studentSubmissions]);

  const listTabs = studentSubmissions?.map((item, index) => ({
    eventKey: item.submissionId,
    title: "Submission " + index,
    TabComponent: <SubmissionTab submissionData={item} key={index} />,
  }));

  const submission = studentSubmissions?.find(
    (submission) =>
      submission.submissionId ==
      (submissionId ? submissionId : studentSubmissions[0]?.submissionId)
  );

  const testCasesTab = testCases?.map((item, index) => {
    if (submission?.testCaseOutput[index].stdout && !submission?.compileError) {
      return {
        eventKey: "TestCase " + index,
        title: (
          <span>
            TestCase {index} ({((item.strength / sumStrength) * 100).toFixed(1)}
            %)
            {submission?.testCaseOutput[index].status ? (
              <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
            ) : (
              <ImCross className={`${classes.Icon} ${classes.IconFail}`} />
            )}
          </span>
        ),
        TabComponent: (
          <TestCaseProblem
            title={
              submission?.testCaseOutput[index].status
                ? "Congratulations, you passed the sample test case."
                : "Your code did not pass this test case."
            }
            input={item.input_data}
            outputExpect={item.output_data}
            outputReal={submission?.testCaseOutput[index].stdout}
          />
        ),
      };
    } else {
      return {
        eventKey: "TestCase " + index,
        title: (
          <span>
            TestCase {index} ({((item.strength / sumStrength) * 100).toFixed(1)}
            %)
            {<ImCross className={`${classes.Icon} ${classes.IconFail}`} />}
          </span>
        ),
        TabComponent: (
          <TestCaseProblem
            title={
              submission?.compileError ? "Compile Time Error" : "Run Time Error"
            }
            error
            compilerMsg={
              submission?.compileError
                ? submission?.compileError
                : submission?.testCaseOutput[index].stderr
            }
          />
        ),
      };
    }
  });

  return (
    <Container>
      <Row className={`mt-2 mb-2`}>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChallengeTabs ListTabs={listTabs} setActive={setSubmissionId} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <ChallengeTabs ListTabs={testCasesTab} PaddingTop="0px" />
        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionsManualMarking;
