import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import useStyles from "./Style";

const LineNumberedTextarea = ({ name, text, handleChange, msg, loading }) => {
  const classes = useStyles();
  const [textareaHeight, setTextareaHeight] = useState("100px");
  useEffect(() => {
    if (typeof text == "string") {
      const lines = text.split("\n").length;
      const newHeight = Math.max(100, lines * 30);
      setTextareaHeight(`${newHeight}px`);
    }
  }, [text]);

  return (
    <Row>
      <Col>
        <div className={classes.textAreaContainer}>
          <div className={classes.lineNumbers}>
            {typeof text == "string" &&
              Array.from({ length: text.split("\n").length }, (_, index) => (
                <div key={index} className={classes.lineNumber}>
                  {index + 1}
                </div>
              ))}
          </div>
          <Form.Control
            as="textarea"
            rows={1}
            name={name}
            value={typeof text == "string" ? text : ""}
            onChange={handleChange}
            style={{ height: textareaHeight }}
            className={classes.textarea}
            disabled={loading}
          />
        </div>
        {msg && <span className={classes.msg}> * {msg}</span>}
      </Col>
    </Row>
  );
};

export default LineNumberedTextarea;
