import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Avatar from "react-avatar";
import Text from "../Text";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineNumber } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import ButtonRank from "../ButtonRank";
import { useNavigate } from "react-router-dom";
const ProfileAside = ({ accountInfo }) => {
  const clasess = useStyles();
  const navigate = useNavigate();
  return (
    <Container fluid className={clasess.Container}>
      <Row>
        <Col className={`${clasess.Col} `}>
          <Row className={`${clasess.Row} mb-3`}>
            <Col>
              <Avatar
                round
                src={accountInfo.img}
                size="150px"
                name={accountInfo.fullName}
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
              <FiUser className={clasess.Icon} />
              <Text
                text={accountInfo.fullName}
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
                text={accountInfo.universityNumber}
                fontFamily="Open Sans"
                size="18px"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
              <TfiEmail className={clasess.Icon} />
              <Text
                text={accountInfo.email}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
              <ButtonRank
                text={"Edit Profile"}
                width={"100%"}
                onClick={() => navigate("/settings")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileAside;
