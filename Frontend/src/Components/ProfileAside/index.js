import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Avatar from "react-avatar";
import Text from "../Text";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineNumber } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import ButtonRank from "../ButtonRank";
import { useNavigate, useParams } from "react-router-dom";
const ProfileAside = ({ accountInfo }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Container fluid className={classes.Container}>
      <Row>
        <Col className={`${classes.Col} `}>
          <Row className={`${classes.Row} mb-3`}>
            <Col>
              <Avatar
                round
                src={accountInfo.img}
                color="black"
                size="150px"
                name={accountInfo.fullName}
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${classes.Col} ${classes.IconContainer}`}>
              <FiUser className={classes.Icon} />
              <Text
                text={accountInfo.fullName}
                fontFamily="Open Sans"
                size="18px"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${classes.Col} ${classes.IconContainer}`}>
              <AiOutlineNumber className={classes.Icon} />
              <Text
                text={accountInfo.universityNumber}
                fontFamily="Open Sans"
                size="18px"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row>
            <Col className={`${classes.Col} ${classes.IconContainer}`}>
              <MdOutlineWorkOutline className={classes.Icon} />
              <Text
                text={accountInfo.role}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${classes.Col} ${classes.IconContainer}`}>
              <TfiEmail className={classes.Icon} />
              <Text
                text={accountInfo.email}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
              />
            </Col>
          </Row>

          {id === undefined && (
            <Row>
              <Col className={`${classes.Col} ${classes.IconContainer}`}>
                <ButtonRank
                  text={"Edit Profile"}
                  width={"100%"}
                  onClick={() => navigate("/settings")}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileAside;
