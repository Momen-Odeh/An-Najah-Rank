import React from "react";
import Text from "../Text";
import { Col, Form } from "react-bootstrap";
import CustomTextarea from "../CustomTextarea";

const DataTypes = ({
  name,
  data,
  selectedOption,
  handleRadioChange,
  handleInputChange,
}) => {
  return (
    <>
      <Col className="d-flex align-items-center">
        <Text text={name} />
        <Form>
          <Form.Group className="d-flex align-items-center m-2">
            <Form.Check
              type="radio"
              label="Editor"
              name="radioGroupInput"
              value="editor"
              checked={selectedOption === "editor"}
              onChange={handleRadioChange}
              className="m-2"
            />
            <Form.Check
              type="radio"
              label="Upload"
              name="radioGroupInput"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={handleRadioChange}
            />
          </Form.Group>
        </Form>
      </Col>

      {selectedOption === "upload" ? (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            name={name}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Text
            text={typeof data != "string" ? "Chosen file: " + data?.name : ""}
          />
        </Form.Group>
      ) : (
        <CustomTextarea
          name={name}
          handleChange={handleInputChange}
          text={data}
        />
      )}
    </>
  );
};

export default DataTypes;
