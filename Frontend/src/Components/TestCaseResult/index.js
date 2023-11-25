import React from "react";
import { Col } from "react-bootstrap";
import Text from "../Text";
import { FaCheck, FaTimes } from "react-icons/fa";

const TestCaseResult = ({ testCaseNumber, result }) => {
  return (
    <Col className="d-flex justify-content-start">
      {result ? (
        <FaCheck color="green" size={20} className="me-3" />
      ) : (
        <FaTimes color="red" size={20} className="me-3" />
      )}
      <Text text={"Test Case #" + testCaseNumber} />
    </Col>
  );
};

export default TestCaseResult;
