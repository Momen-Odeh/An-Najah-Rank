import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import useStyles from './Style';

const LineNumberedTextarea = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('100px');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const lines = text.split('\n').length;
    const newHeight = Math.max(100, lines * 30);
    setTextareaHeight(`${newHeight}px`);
  }, [text]);

  return (
    <Container fluid className='m-3'>
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
                value={text}
                onChange={handleTextChange}
                style={{ height: textareaHeight }}
                className={classes.textarea}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LineNumberedTextarea;
