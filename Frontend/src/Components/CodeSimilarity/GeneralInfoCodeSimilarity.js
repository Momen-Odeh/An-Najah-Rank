import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineNumber } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { MdOutlinePercent } from "react-icons/md";
import Text from "../Text";
import useStyles from "./GeneralStyle";
const GeneralInfoCodeSimilarity = () => {
  const clasess = useStyles();
  return (
    <Container fluid>
      <Row>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <FiUser className={clasess.Icon} />
          <Text
            text={"Momen H. Odeh"}
            fontFamily="Open Sans"
            size="18px"
            wegiht="600"
          />
        </Col>
      </Row>
      <Row>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <AiOutlineNumber className={clasess.Icon} />
          <Text
            text={"11923929"}
            fontFamily="Open Sans"
            size="18px"
            wegiht="600"
          />
        </Col>
      </Row>
      {/* <Row>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <TfiEmail className={clasess.Icon} />
          <Text
            text={"momen.odeh74@gmail.com"}
            fontFamily="Open Sans"
            size="14px"
            wegiht="600"
          />
        </Col>
      </Row> */}
      <Row className="mb-4">
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <MdOutlinePercent className={clasess.Icon} />
          <Text text={"66"} fontFamily="Open Sans" size="18px" wegiht="600" />
        </Col>
      </Row>
    </Container>
  );
};

export default GeneralInfoCodeSimilarity;
