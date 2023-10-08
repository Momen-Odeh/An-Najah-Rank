import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../Text";
import SampleContainer from "../SampleContainer";
const ProblemStatement = ({ data }) => {
  const classes = useStyles();
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Input Format"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{ __html: data.inputFormat }}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Constraints"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{ __html: data.constraints }}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Output Format"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{ __html: data.outputFormat }}
          />
        </Col>
      </Row>
      {console.log(data.testCases)}
      {data?.testCases?.map((itemData, index) => (
        <div key={index}>
          <Row className="mb-1">
            <Col className={classes.Col}>
              <Text text={`Simple Input ${index}`} />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${classes.Col} `}>
              <SampleContainer data={itemData.input_data} />
            </Col>
          </Row>
          <Row className="mb-1">
            <Col className={classes.Col}>
              <Text text={`Sample Output ${index}`} />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${classes.Col} `}>
              <SampleContainer data={itemData.output_data} />
            </Col>
          </Row>
          {/*  */}
          {itemData.explanation && (
            <>
              <Row className="mb-1">
                <Col className={classes.Col}>
                  <Text text={`Explanation ${index}`} />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col className={`${classes.Col} `}>
                  <SampleContainer data={itemData.explanation} />
                </Col>
              </Row>
            </>
          )}
          {/*  */}
        </div>
      ))}
    </Container>
  );
};

export default ProblemStatement;
