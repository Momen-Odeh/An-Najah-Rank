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
  const classes = useStyles({
    msg,
    width,
    labelFontSize,
    labelFontColor,
    labelFontWeight,
  });
  const [showPassword, SetShowPassword] = useState(false);
  return (
    <div className={classes.div}>
      {label && (
        <Form.Label className={classes.Label} htmlFor={id}>
          {label}
        </Form.Label>
      )}
      <InputGroup>
        {options ? (
          <Form.Select
            className={`${classes.Control} ${classes.Select} ${className}`}
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
              <option value={item.value} key={index} className={classes.option}>
                {item.text}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            className={classes.Control}
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
            className={classes.IconPassword}
            onClick={() => {
              SetShowPassword(!showPassword);
            }}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </InputGroup.Text>
        )}
      </InputGroup>
      {msg && (
        <Form.Text className={classes.msg} muted>
          * {msg}
        </Form.Text>
      )}
    </div>
  );
};

export default InputFiledRank;
