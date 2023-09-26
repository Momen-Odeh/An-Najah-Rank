import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Text from '../Text';
import TextEditor from '../TextEditor';
import CustomButton from '../CustomButton';
import Tags from '../Tags';

const Details = ({details, handleChange}) => {
  return (
    <Container fluid>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Challenge Difficulty'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Select
              name="difficulty"
              onChange={handleChange}
              value={details.difficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Challenge Name'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              id="input"
              onChange={handleChange}
              value={details.name}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Description'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="description"
              id="textarea"
              rows={3}
              onChange={handleChange}
              value={details.description}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Problem Statement'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <TextEditor  name={'problemStatement'} text={details.problemStatement} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Input Format'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <TextEditor  name={'inputFormat'} text={details.inputFormat} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Constraints'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <TextEditor  name={'constraints'} text={details.constraints} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Output Format'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <TextEditor  name={'outputFormat'} text={details.outputFormat} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Tags'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <Tags tags={details.tags} handleChange={handleChange}/>
        </Col>
      </Row>

    </Container>
  );
};

export default Details;
