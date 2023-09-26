import React from "react";
import { Form } from "react-bootstrap";
import useStyles from "./style";

const SelectionGroup = ({ choices, language }) => {
  const classes = useStyles();
  return (
    <Form.Group
      className={classes.Group}
      onChange={(e) => {
        language.setValue(e.target.value);
      }}
    >
      <Form.Select>
        {choices.map((item, index) => (
          <option key={index} value={item.value}>
            {item.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectionGroup;
