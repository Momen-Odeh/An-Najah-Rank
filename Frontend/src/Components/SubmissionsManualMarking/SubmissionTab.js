import { Editor } from "@monaco-editor/react";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";
import InputFiledRank from "../InputFiledRank";
import ButtonRank from "../ButtonRank";
import { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../../Utils/toast";

const SubmissionTab = ({ submissionData }) => {
  const classes = useStyle();
  const [score, setScore] = useState(submissionData.score);
  const handleUpdateScore = () => {
    axios
      .put(`/update-submission-score/${submissionData.submissionId}`, {
        submissionResult: score,
      })
      .then((res) => {
        toastSuccess("updated successfully");
      })
      .catch((error) => {
        toastError(error);
      });
  };
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
                  new Date(submissionData?.submissionDate).toLocaleString()
                }
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row className={`${classes.date} mt-2`}>
            <Col className="d-flex align-items-center">
              <Text
                text={"Score out of 100: "}
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
              <Row className={classes.score}>
                <InputFiledRank
                  disabled={!submissionData.manualMark}
                  value={score}
                  textAlign="center"
                  onChange={(e) => {
                    setScore(e.target.value);
                  }}
                />
              </Row>
            </Col>
            {submissionData.manualMark && (
              <Col className="d-flex justify-content-end">
                <ButtonRank text={"Save Changes"} onClick={handleUpdateScore} />
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
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
            </Col>
          </Row>
          <Editor
            value={submissionData?.code}
            height={"300px"}
            language={submissionData?.language}
            className="mt-2"
            options={{ padding: "2px", readOnly: true }}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default SubmissionTab;
