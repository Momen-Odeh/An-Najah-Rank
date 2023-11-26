import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import useStyles from "./style";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
const InputFiledRank = ({
  id,
  type,
  label,
  value,
  name,
  onChange,
  disabled,
  msg,
  placeholder,
  width,
  size,
  labelFontSize = "18px",
  labelFontWeight = "500",
  labelFontColor = "#696c83",
  as,
  rows,
  accept,
  onKeyDown,
  ref,
  autoComplete,
  options,
  className,
  style,
  textAlign = null,
}) => {
  const clasess = useStyles({
    msg,
    width,
    labelFontSize,
    labelFontColor,
    labelFontWeight,
  });
  const [showPassword, SetShowPassword] = useState(false);
  return (
    <div className={clasess.div}>
      {label && (
        <Form.Label className={clasess.Label} htmlFor={id}>
          {label}
        </Form.Label>
      )}
      <InputGroup>
        {options ? (
          <Form.Select
            className={`${clasess.Control} ${clasess.Select} ${className}`}
            style={style}
            type={type}
            id={id}
            value={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            onKeyDown={onKeyDown}
          >
            {options.map((item, index) => (
              <option value={item.value} key={index} className={clasess.option}>
                {item.text}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            className={clasess.Control}
            type={type === "password" && showPassword ? "text" : type}
            id={id}
            value={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            as={as}
            rows={rows}
            accept={accept}
            onKeyDown={onKeyDown}
            ref={ref}
            autoComplete={autoComplete}
            style={{ textAlign: textAlign }}
          />
        )}

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

export default InputFiledRank;
