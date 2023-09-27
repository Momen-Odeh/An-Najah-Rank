import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import { FaCheck } from "react-icons/fa";
import ButtonRank from "../ButtonRank";
const TabTable = ({ TableHeader, submitions }) => {
  const classes = useStyles();
  let values;
  const setValues = (e) => {
    values = e;
  };
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        {TableHeader.map((item, index) => (
          <Col key={index} className="d-flex align-items-center justify-content-center">
            <Text text={item} color="#39424E" />
          </Col>
        ))}
      </Row>
      {submitions.map((item, index) => (
        <Row className={classes.Row} key={index}>
          {setValues(Object.values(item))}
          {values.map((val, index) => (
            <Col key={index} className="d-flex align-items-center justify-content-center">{val}</Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default TabTable;
