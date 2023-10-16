import React from "react";
import { Form } from "react-bootstrap";
import useStyles from "./style";

const InputFiledRand = ({ id, type, label, value }) => {
  const clasess = useStyles();
  return (
    <div>
      <Form.Label className={clasess.Label} htmlFor={id}>
        {label}
      </Form.Label>
      <Form.Control
        className={clasess.Control}
        type={type}
        id={id}
        value={value}
      />
    </div>
  );
};

export default InputFiledRand;
