import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import useStyles from './Style';

const LineNumberedTextarea = ({name, text, handleChange}) => {
  const classes = useStyles();
  const [textareaHeight, setTextareaHeight] = useState('100px');
  useEffect(() => {
    const lines = text.split('\n').length;
    const newHeight = Math.max(100, lines * 30);
    setTextareaHeight(`${newHeight}px`);
  }, [text]);

  return (
      <Row>
        <Col>
          <div className={classes.textAreaContainer}>
            <div className={classes.lineNumbers}>
              {Array.from({ length: text.split('\n').length }, (_, index) => (
                <div key={index} className={classes.lineNumber}>
                  {index + 1}
                </div>
              ))}
            </div>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={1}
                name={name}
                value={text}
                onChange={handleChange}
                style={{ height: textareaHeight }}
                className={classes.textarea}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>
  );
};

export default LineNumberedTextarea;
