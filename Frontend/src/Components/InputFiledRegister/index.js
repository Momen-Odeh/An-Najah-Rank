import React from "react";
import Form from "react-bootstrap/Form";
import useStyles from "./stayle";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { InputGroup } from "react-bootstrap";
const InputFiledRegister = ({ label, Icon, placeHolder, type }) => {
  const classes = useStyles();
  return (
    <Form className={classes.form}>
      <Form.Group
        className={`${classes.Group} `} //mb-4
        controlId="formGroupEmail"
      >
        <Form.Label className={classes.label}>{label}</Form.Label>
        <InputGroup.Text className={classes.InputGroup}>
          <Icon className={classes.icon} draggable={false} alt="icon" />
          <Form.Control
            type={type}
            placeholder={placeHolder}
            className={classes.InputFiled}
          />
          {type === "password" && (
            <AiOutlineEyeInvisible
              className={classes.iconPassword}
              draggable={false}
              alt="icon"
            />
          )}
        </InputGroup.Text>
      </Form.Group>
    </Form>
  );
};

export default InputFiledRegister;
