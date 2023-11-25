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
      <Form.Select className={classes.Select} value={language.value}>
        {choices.map((item, index) => (
          <option key={index} value={item.value} className={classes.Option}>
            {item.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectionGroup;
