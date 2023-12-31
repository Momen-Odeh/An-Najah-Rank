import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../../Components/Text";
import PersonInfo from "./PersonInfo";

const Conversations = () => {
  const classes = useStyle();
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Container fluid>
      <Row className={classes.newChat}>
        <Col className={`${classes.Col} `} xs="auto">
          <Text
            text={"Conversations"}
            color="#394265"
            size="18px"
            wegiht="600"
          />
        </Col>
        <Col className={`${classes.Col} `} xs="auto">
          <Text text={"new"} />
          {/* Here will be enter the new box */}
        </Col>
      </Row>
      <Row className={classes.Conversations}>
        {data.map((item, index) => (
          <Row key={index}>
            <Col key={index} className={`${classes.Col} `}>
              <PersonInfo key={index} />
            </Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default Conversations;
