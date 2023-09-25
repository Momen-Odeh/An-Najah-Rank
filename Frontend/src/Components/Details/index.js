import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Text from '../Text';
import CustomTextarea from '../CustomTextarea';
import CustomButton from '../CustomButton';
import Tags from '../Tags';

const Details = () => {
  const [details, setDetails] = useState({
    difficulty: '',
    name: '',
    description: '',
    problemStatement: '',
    inputFormat: '',
    constraints: '',
    outputFormat: '',
    tags: [],
  });

  // Handler for input changes (for both difficulty and name)
  const handleChange = (e,Array = null) => {
    if(!Array){
      const { name, value } = e.target;
      console.log(value)
      setDetails({ ...details, [name]: value });
    }
    else{
      setDetails({ ...details, tags: Array });
      console.log(Array)
    }
  };

  return (
    <Container className='m-3'>

      <Row className='m-2'>
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

      <Row className='m-2'>
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

      <Row className='m-2'>
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

      <Row className='m-2'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Problem Statement'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <CustomTextarea  name={'problemStatement'} text={details.problemStatement} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='m-2'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Input Format'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <CustomTextarea  name={'inputFormat'} text={details.inputFormat} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='m-2'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Constraints'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <CustomTextarea  name={'constraints'} text={details.constraints} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='m-2'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Output Format'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <CustomTextarea  name={'outputFormat'} text={details.outputFormat} handleChange={handleChange}/>
        </Col>
      </Row>

      <Row className='m-2'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Tags'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <Tags tags={details.tags} handleChange={handleChange}/>
        </Col>
      </Row>

      <CustomButton text='Save Changes' />
      <CustomButton text='Preview Challenges' backgroundColor='#e4e4e4'/>
    </Container>
  );
};

export default Details;
