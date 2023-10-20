import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import useStyles from "./style";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
const InputFiledRand = ({
  id,
  type,
  label,
  value,
  name,
  onChange,
  disabled,
  msg,
}) => {
  const clasess = useStyles({ msg });
  const [showPassword, SetShowPassword] = useState(false);
  return (
    <div>
      <Form.Label className={clasess.Label} htmlFor={id}>
        {label}
      </Form.Label>
      <InputGroup>
        <Form.Control
          className={clasess.Control}
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          disabled={disabled}
        />

        {type === "password" && (
          <InputGroup.Text
            className={clasess.IconPassword}
            onClick={() => {
              SetShowPassword(!showPassword);
            }}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </InputGroup.Text>
        )}
      </InputGroup>
      {msg && (
        <Form.Text className={clasess.msg} muted>
          * {msg}
        </Form.Text>
      )}
    </div>
  );
};

export default InputFiledRand;
