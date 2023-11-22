import { Editor } from "@monaco-editor/react";
import React from "react";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";

const SubmissionTab = ({ submissionData }) => {
  const classes = useStyle();
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
            <Col>
              <Text
                text={"Score: " + submissionData?.score}
                fontFamily="OpenSans"
                size="18px"
                color="#39424e"
                wegiht="600"
              />
              <FormControl
                type="number"
                placeholder="Enter a number"
                value={submissionData?.score}
              />
            </Col>
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
