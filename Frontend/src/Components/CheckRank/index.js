import React from "react";
import useStyle from "./style";
import { Form } from "react-bootstrap";

const CheckRank = ({
  type,
  label,
  name,
  checked,
  onChange,
  value,
  disabled,
}) => {
  const classes = useStyle();
  return (
    <label className={classes.CheckLabel}>
      <Form.Check
        type={type}
        name={name}
        className={classes.Check}
        checked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <span className="ms-1">{label}</span>
    </label>
  );
};

export default CheckRank;
