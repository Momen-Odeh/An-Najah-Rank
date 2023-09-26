import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import SampleContainer from "../SampleContainer";
const sample = {
  input: `4 
 5,-80,-5,12
 6,14,-5,19
 -8,-2,11,12
 9,-4,16,2`,
  output: "53",
};
const TestCaseProblem = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row>
        <Col>
          <Text
            text={"Your code did not pass this test case."}
            color="#39424E "
            size="17.6px"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Text text={"Input (stdin)"} color="#39424E " size="14px" />
        </Col>
      </Row>
      <Row>
        <Col>
          <SampleContainer
            data={sample.input}
            backgroundColor="#efefef"
            border={"1px solid #c2c7d0"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Text text={"Your Output (stdout)"} color="#39424E " size="14px" />
        </Col>
      </Row>
      <Row>
        <Col>
          <SampleContainer
            data={sample.output}
            backgroundColor="#efefef"
            border={"1px solid #c2c7d0"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Text text={"Expected Output"} color="#39424E " size="14px" />
        </Col>
      </Row>
      <Row>
        <Col>
          <SampleContainer
            data={sample.output}
            backgroundColor="#efefef"
            border={"1px solid #c2c7d0"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Text text={"Compiler Message"} color="#39424E " size="14px" />
        </Col>
      </Row>
      <Row>
        <Col>
          <SampleContainer
            data={"Good answer"}
            backgroundColor="#efefef"
            border={"1px solid #c2c7d0"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TestCaseProblem;
