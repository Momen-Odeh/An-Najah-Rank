import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Avatar from "react-avatar";
import Text from "../Text";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineNumber } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import ButtonRank from "../ButtonRank";

const ProfileAside = () => {
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      <Row>
        <Col className={`${clasess.Col} `}>
          <Row className={`${clasess.Row} mb-3`}>
            <Col>
              <Avatar
                round
                src="https://media.licdn.com/dms/image/C4D03AQEIPhrTNjU_2A/profile-displayphoto-shrink_800_800/0/1663090037588?e=2147483647&v=beta&t=2Lndt7vDM-_MOETPCI99l4nNMJL_XjpIHlY_5m9sJvc"
                size="150px"
                name="Momen Odeh"
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
              <FiUser className={clasess.Icon} />
              <Text
                text={"Momen Odeh"}
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
          <Row>
            <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
              <TfiEmail className={clasess.Icon} />
              <Text
                text={"momen.odeh74@gmail.com"}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileAside;
