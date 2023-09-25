import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';

const NumberedTextEditor = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleNumberedClick = () => {
    // Implement logic to number lines
    // You can split the text by lines and add numbers to each line.
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h4>Numbered Text Editor</h4>
        </Col>
        <Col>
          <Button onClick={handleBoldClick}>Bold</Button>
          <Button onClick={handleNumberedClick}>Numbered</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <FormControl
              as="textarea"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={isBold ? 'bold-text' : ''}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NumberedTextEditor;
