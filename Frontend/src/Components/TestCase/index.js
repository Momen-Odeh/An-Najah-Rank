import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import useStyle from "./Style";
import DataTypes from "../DataTypes";
import ButtonRank from "../ButtonRank";
import InputFiledRank from "../InputFiledRank";
import CheckRank from "../CheckRank";
import { useEffect } from "react";
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
  relatedContests,
}) => {
  const classes = useStyle();

  const inputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";
  const outputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";
  const [selectedContests, setSelectedContests] = useState(
    new Array(relatedContests.length).fill(false)
  );
  const [selectedOptionInput, setSelectedOptionInput] = useState(inputType);
  const [selectedOptionOutput, setSelectedOptionOutput] = useState(outputType);
  useEffect(() => {
    if (showAddModal) {
      setSelectedContests(new Array(relatedContests.length).fill(false));
    }
  }, [showAddModal]);

  const handleSelectedContests = (index, val) => {
    const newSelectedContests = [...selectedContests];
    newSelectedContests[index] = val;
    setSelectedContests(newSelectedContests);
  };
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
          {relatedContests.length > 0 && (
            <>
              <Row>
                <Col xs="auto">
                  <Text
                    text={
                      "* This challenge is used in courses and there is student submit code please choose the contest in course who want to run this test case on it."
                    }
                    color="red"
                  />
                </Col>
              </Row>
              <Row className="m-1">
                <Col className="ms-2">
                  {relatedContests.map((context, index) => (
                    <CheckRank
                      key={index}
                      type="checkbox"
                      name="sample"
                      checked={selectedContests[index]}
                      onChange={(e) => {
                        handleSelectedContests(index, e.target.checked);
                      }}
                      disabled={loading}
                      label={
                        "contest " +
                        context.contestId +
                        " - " +
                        context.contestName +
                        " in course " +
                        context.courseNumber +
                        " - " +
                        context.courseName +
                        "."
                      }
                    />
                  ))}
                </Col>
              </Row>
              <hr></hr>
            </>
          )}
          <Row>
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
                  onClick={() => handleAdd(selectedContests)}
                  disabled={loading}
                />
              )}
              {action !== "add" && (
                <ButtonRank
                  text={"Update"}
                  onClick={() => handleUpdate(selectedContests)}
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
