import React, { useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import useStyle from "./Style";
import DataTypes from "../DataTypes";
import ButtonRank from "../ButtonRank";
const TestCase = ({
  showAddModal,
  setShowAddModal,
  currentTestCase,
  setCurrentTestCase,
  handleAdd,
  handleUpdate,
  action,
}) => {
  const classes = useStyle();
  const inputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";
  const outputType =
    typeof currentTestCase.input == "string" ? "editor" : "upload";

  const [selectedOptionInput, setSelectedOptionInput] = useState(inputType);
  const [selectedOptionOutput, setSelectedOptionOutput] = useState(outputType);

  const handleInputChange = (e, optionName, val) => {
    if (e) {
      const { name, value, type, checked, files } = e.target;
      const newValue =
        type === "checkbox" ? checked : type === "file" ? files[0] : value;
      setCurrentTestCase({ ...currentTestCase, [name]: newValue });
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
    <Container fluid className="test-cases-container">
      <Modal
        show={showAddModal}
        dialogClassName={classes.customModal}
        onHide={() => {
          setShowAddModal(false);
          setCurrentTestCase("");
        }}
        scrollable
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Test Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col className="d-flex align-items-center">
                <Text text={"Strength"} />
                <Form.Group className="m-2">
                  <Form.Control
                    type="number"
                    name="strength"
                    value={currentTestCase.strength}
                    onChange={handleInputChange}
                    className={classes.StrengthInput}
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-center">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="sample"
                    label="Sample"
                    checked={currentTestCase.sample}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <DataTypes
                name={"input"}
                data={currentTestCase.input}
                selectedOption={selectedOptionInput}
                handleRadioChange={handleRadioChangeInput}
                handleInputChange={handleInputChange}
              />
            </Row>

            <Row>
              <DataTypes
                name={"output"}
                data={currentTestCase.output}
                selectedOption={selectedOptionOutput}
                handleRadioChange={handleRadioChangeOutput}
                handleInputChange={handleInputChange}
              />
            </Row>

            {currentTestCase.sample && (
              <Row className="mt-3">
                <Col className="mb-2">
                  <Text text={"Explanation"} />
                </Col>
                <TextEditor
                  name={"explanation"}
                  text={currentTestCase.explanation}
                  handleChange={handleInputChange}
                />
              </Row>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="d-flex justify-content-center">
              {action === "add" && (<ButtonRank
                  text={"Save"}
                  onClick={handleAdd}
                  backgroundColor="#1cb557"
                  hoverBackgroundColor="green"
                  color="white"
                />)}
                {action !== "add" && (<ButtonRank
                  text={"Update"}
                  onClick={()=>handleUpdate(null,"all",null)}
                  backgroundColor="#1cb557"
                  hoverBackgroundColor="green"
                  color="white"
                />)}
                {action !== "add" && (
                  <ButtonRank
                    text={"Cancel"}
                    onClick={() => {
                      setShowAddModal(false);
                      setCurrentTestCase("");
                    }}
                    backgroundColor="#1cb557"
                    hoverBackgroundColor="green"
                    color="white"
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestCase;