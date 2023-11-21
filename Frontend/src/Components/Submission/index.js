import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TestCaseResult from "../TestCaseResult";
import { Editor } from "@monaco-editor/react";
import Text from "../Text";
import useStyle from "./style";
import ButtonRank from "../ButtonRank";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Submission = () => {
  const classes = useStyle();
  const { id, contestId, challengeId, submissionId } = useParams();
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState(null);
  const handleOpenInEditor = () => {
    localStorage.setItem(
      "challenge " + challengeId,
      JSON.stringify({
        language: submissionData.language,
        code: submissionData.code,
      })
    );
    navigate(
      `/courses/${id}/contests/${contestId}/challenges/${challengeId}/problem`
    );
  };
  useEffect(() => {
    axios
      .get(
        `/submission-info?challengeId=${challengeId}&SubmissionId=${submissionId}&contestId=${contestId}`
      )
      .then((res) => {
        setSubmissionData(res.data.submission);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Card>
        <Card.Header>
          <Text
            text={"Submission Details"}
            fontFamily="OpenSans"
            size="18px"
            color="#39424e"
            wegiht="600"
            height="2"
          />
        </Card.Header>
        <Card.Body>
          <Row className={`${classes.date} mt-2`}>
            <Col>
              <Text
                text={
                  "Submitted at: " +
                  new Date(submissionData?.submissionTime).toLocaleString()
                }
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row className={`${classes.date} mt-2`}>
            <Col>
              <Text
                text={"Score: " + submissionData?.score}
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row
        className={`${classes.ColBorder} p-3 d-flex justify-content-center flex-wrap`}
      >
        {submissionData?.testCasesStatus?.map((item, index) => (
          <Col className={`${classes.testCaseResult} m-1`}>
            <TestCaseResult result={item} testCaseNumber={index} />
          </Col>
        ))}
      </Row>
      <Row className={`${classes.date} mt-4`}>
        <Text
          text={"Submitted Code"}
          fontFamily="OpenSans"
          size="24px"
          color="#39424e"
          wegiht="600"
        />
      </Row>
      <Row className={`${classes.ColBorder}`}>
        <Col>
          <Row className={`${classes.editorHeader}`}>
            <Col className="d-flex justify-content-between align-items-center">
              <Text
                text={"Language: " + submissionData?.language}
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
              <ButtonRank
                text={"Open in editor"}
                onClick={handleOpenInEditor}
              />
            </Col>
          </Row>
          <Editor
            value={submissionData?.code}
            height={"400px"}
            language={submissionData?.language}
            className="mt-2"
            options={{ padding: "2px", readOnly: true }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Submission;
