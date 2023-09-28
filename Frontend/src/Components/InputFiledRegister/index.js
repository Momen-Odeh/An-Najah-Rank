import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import useStyles from "./stayle";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { InputGroup } from "react-bootstrap";
const InputFiledRegister = ({
  label,
  Icon,
  placeHolder,
  type,
  onChange,
  name,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const changePasswordState = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Form className={classes.form}>
      <Form.Group
        className={`${classes.Group} `} //mb-4
        // controlId="formGroupEmail"
      >
        <Form.Label className={classes.label}>{label}</Form.Label>
        <InputGroup.Text className={classes.InputGroup}>
          <Icon className={classes.icon} draggable={false} alt="icon" />
          <Form.Control
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeHolder}
            className={classes.InputFiled}
            onChange={onChange}
            name={name}
          />
          {type === "password" &&
            (showPassword ? (
              <AiOutlineEye
                className={classes.iconPassword}
                draggable={false}
                alt="icon"
                onClick={changePasswordState}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={classes.iconPassword}
                draggable={false}
                alt="icon"
                onClick={changePasswordState}
              />
            ))}
        </InputGroup.Text>
      </Form.Group>
    </Form>
  );
};

export default InputFiledRegister;
