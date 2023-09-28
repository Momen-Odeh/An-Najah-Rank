import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import TextEditor from "../TextEditor";
import ButtonRank from "../ButtonRank";
const ContestsDetalis = () => {
  const classes = useStyle();
  return (
    <Container fluid className={classes.Container}>
      <Row className="mb-2">
        <Col>
          <Text
            text={"Contest Details"}
            color="#39424e"
            size="24px"
            fontFamily="Open Sans"
            wegiht="bold"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Customize your contest by providing more information needed to create your landing page. Your contest will only be available to those who have access to the contest URL."
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Contest Name"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Form.Control type="text" className={classes.Form} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Start Time"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Datetime />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"End Time"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Datetime />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}></Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Form.Check
            className={classes.Check}
            type={"checkbox"}
            label={`This contest has no end time.`}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <hr />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Text
            text={"Landing Page Customization"}
            color="#39424e"
            size="24px"
            fontFamily="Open Sans"
            wegiht="bold"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Fill out this information to customize your contest landing page."
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Background Image"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col lg={3} md={5} sm={6} xs={7}>
          <Form.Control type="file" name="output" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Description"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col>
          <TextEditor
            handleChange={(event, name, value) => {
              //   console.log(value);
            }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Prizes"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col>
          <TextEditor
            handleChange={(event, name, value) => {
              //   console.log(value);
            }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Rules"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col>
          <TextEditor
            handleChange={(event, name, value) => {
              //   console.log(value);
            }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2} sm={3} xs={5} className={classes.ColInput}>
          <Text
            text={"Scoring"}
            color="#39424e"
            size="14px"
            wegiht="bold"
            fontFamily="Open Sans"
          />
        </Col>
        <Col>
          <TextEditor
            handleChange={(event, name, value) => {
              //   console.log(value);
            }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className={classes.ButtonSelect}>
          <ButtonRank
            text={"Save Changes"}
            backgroundColor="rgb(46, 200, 102)"
            color="#fff"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContestsDetalis;
