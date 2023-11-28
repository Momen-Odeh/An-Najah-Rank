import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import useStyle from "./Style";
import InputFiledRank from "../InputFiledRank";
import ButtonRank from "../ButtonRank";

const CustomInputGroup = ({
  BtnText,
  handleBtnClick,
  placeholder = "Enter text",
  type = "text",
  disabled,
}) => {
  const classes = useStyle();
  const [data, setData] = useState("");
  return (
    <InputGroup className="mb-3">
      <InputFiledRank
        type={type}
        placeholder={placeholder}
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
        className={classes.inputTags}
        disabled={disabled}
      />
      <ButtonRank
        onClick={() => {
          handleBtnClick(data);
          setData("");
        }}
        text={BtnText}
        className={classes.button}
        disabled={disabled}
      />
    </InputGroup>
  );
};

export default CustomInputGroup;
