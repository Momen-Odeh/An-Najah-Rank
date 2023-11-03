import React, { useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import useStyle from "./Style";
import DataTypes from "../DataTypes";
import ButtonRank from "../ButtonRank";
import InputFiledRank from "../InputFiledRank";
import AlertComponent from "../Alert";
import CheckRank from "../CheckRank";
const TestCase = ({
  showAddModal,
  setShowAddModal,
  currentTestCase,
  setCurrentTestCase,
  handleAdd,
  handleUpdate,
  action,
  errorMsg,
  loading,
  setErrorMsg,
}) => {
  const classes = useStyle();

  const inputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";
  const outputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";

  const [selectedOptionInput, setSelectedOptionInput] = useState(inputType);
  const [selectedOptionOutput, setSelectedOptionOutput] = useState(outputType);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  const handleInputChange = (e, optionName, val) => {
    if (e) {
      const { name, value, type, checked, files } = e.target;
      const newValue =
        type === "checkbox" ? checked : type === "file" ? files[0] : value;
      setCurrentTestCase({ ...currentTestCase, [name]: newValue });
      if (name === "sample")
        setCurrentTestCase({
          ...currentTestCase,
          [name]: newValue,
          strength: newValue ? 0 : 10,
        });
    } else {
      setCurrentTestCase({ ...currentTestCase, [optionName]: val });
    }
  };

  const handleRadioChangeInput = (event) => {
    setSelectedOptionInput(event.target.value);
  };

  const handleRadioChangeOutput = (event) => {
    setSelectedOptionOutput(event.target.value);
  };

  return (
    <Modal
      show={showAddModal}
      dialogClassName={classes.customModal}
      onHide={() => {
        setShowAddModal(false);
        setCurrentTestCase("");
        setErrorMsg({
          input: null,
          output: null,
          explanation: null,
          strength: null,
        });
      }}
      scrollable
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Test Case</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            {/* className="align-items-center justify-content-center"> */}
            <Col xs="auto">
              <Text text={"Strength"} />
            </Col>
            <Col xs="auto">
              <InputFiledRank
                name="strength"
                value={currentTestCase.strength}
                onChange={handleInputChange}
                className={classes.StrengthInput}
                width={"80px"}
                msg={errorMsg.strength}
              />
            </Col>
            <Col className={"ms-2"}>
              <CheckRank
                type="checkbox"
                name="sample"
                label={"Sample"}
                checked={currentTestCase.sample}
                onChange={handleInputChange}
                disabled={loading}
              />
            </Col>
          </Row>

          <DataTypes
            name={"input"}
            data={currentTestCase.input}
            selectedOption={selectedOptionInput}
            handleRadioChange={handleRadioChangeInput}
            handleInputChange={handleInputChange}
            msg={errorMsg.input}
            loading={loading}
          />

          <DataTypes
            name={"output"}
            data={currentTestCase.output}
            selectedOption={selectedOptionOutput}
            handleRadioChange={handleRadioChangeOutput}
            handleInputChange={handleInputChange}
            msg={errorMsg.output}
            loading={loading}
          />

          {currentTestCase.sample && (
            <Row className="mt-3">
              <Col className="mb-2">
                <Text text={"Explanation"} />
              </Col>
              <TextEditor
                name={"explanation"}
                text={currentTestCase.explanation}
                handleChange={handleInputChange}
                msg={errorMsg.explanation}
                disabled={loading}
              />
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              {action === "add" && (
                <ButtonRank
                  text={"Save"}
                  onClick={handleAdd}
                  disabled={loading}
                />
              )}
              {action !== "add" && (
                <ButtonRank
                  text={"Update"}
                  onClick={() => handleUpdate(null, "all", null)}
                  disabled={loading}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default TestCase;
