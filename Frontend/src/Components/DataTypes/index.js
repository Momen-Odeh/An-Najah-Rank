import React from "react";
import Text from "../Text";
import { Col, Form, Row } from "react-bootstrap";
import CustomTextarea from "../CustomTextarea";
import CheckRank from "../CheckRank";
import InputFiledRank from "../InputFiledRank";

const DataTypes = ({
  name,
  data,
  selectedOption,
  handleRadioChange,
  handleInputChange,
  msg,
  loading,
}) => {
  return (
    <Row className="d-flex flex-column p-0 mt-2">
      <Col xs="auto" className="mb-2">
        <Text text={name + ":"} />
      </Col>

      {/* <Form>
        <Form.Group className="d-flex align-items-center m-2">
          <Col xs="auto">
            <CheckRank
              label={"Editor"}
              type="radio"
              name="radioGroupInput"
              checked={selectedOption === "editor"}
              onChange={handleRadioChange}
              value="editor"
            />
          </Col>
          <Col xs="auto">
            <CheckRank
              type="radio"
              label="Upload"
              name="radioGroupInput"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={handleRadioChange}
            />
          </Col>
        </Form.Group>
      </Form> */}
      <Col>
        {selectedOption === "upload" ? (
          <Form.Group className="p-0 mb-3">
            <InputFiledRank
              type="file"
              name={name}
              onChange={handleInputChange}
              msg={msg}
              loading={loading}
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
            msg={msg}
            loading={loading}
          />
        )}
      </Col>
    </Row>
  );
};

export default DataTypes;
