import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import ButtonRank from "../ButtonRank";

const renderValue = (value) => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(', ');
  } else if (typeof value === 'object' && value !== null) {
    return Object.values(value).join(', ');
  }
}

const TabTable = ({ TableHeader, TableData, url=null }) => {
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
      {TableData.map((item, index) => (
        url?
        <Link to={url} className={classes.link}>
        <Row className={classes.Row} key={index}>
          {setValues(Object.values(item))}
          {values.map((val, index) => (
            <Col key={index} className="d-flex align-items-center justify-content-center">{renderValue(val)}</Col>
          ))}
        </Row>
        </Link>
        :
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
