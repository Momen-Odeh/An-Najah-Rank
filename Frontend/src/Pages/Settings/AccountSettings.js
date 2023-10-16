import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import Avatar from "react-avatar";
import ButtonRank from "../../Components/ButtonRank";
import useStyles from "./style";
import InputFiledRand from "../../Components/InputFiledRank";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
const AccountSettings = () => {
  const clasess = useStyles();
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Text
            text={"General Info"}
            fontFamily="Open Sans"
            size="20px"
            wegiht="600"
            color="#191e35"
          />
        </Col>
      </Row>
      <Row className="g-4 mb-4">
        <Col xs={"auto"}>
          <Avatar
            round
            size="150px"
            color="#0e141e"
            src="https://media.licdn.com/dms/image/C4D03AQEIPhrTNjU_2A/profile-displayphoto-shrink_800_800/0/1663090037588?e=2147483647&v=beta&t=2Lndt7vDM-_MOETPCI99l4nNMJL_XjpIHlY_5m9sJvc"
            name="momen Odeh"
          />
        </Col>
        <Col className={clasess.UserInfoImg}>
          <div className={clasess.IconContainer}>
            <AiOutlineMail size={"25px"} color={"#191e35"} />{" "}
            <Text text={"momen.odeh74@gmail.com"} color={"#191e35"} />
          </div>
          <div className={clasess.IconContainer}>
            <MdOutlineWorkOutline size={"25px"} color={"#191e35"} />{" "}
            <Text text={"Student"} color={"#191e35"} />
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={clasess.AccountImgContainer}>
          <ButtonRank
            text={"Uplode image"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
          />
          <ButtonRank
            text={"Delete Image"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRand
            type={"text"}
            label={"Full Name"}
            id={"full-name"}
            value={"Momen Hasan Awad Odeh"}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRand
            type={"text"}
            label={"University Number"}
            id={"University-Number"}
            value={"11923929"}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Text
            text={"Delete Accounts"}
            fontFamily="Open Sans"
            size="18px"
            wegiht="500"
            color="#696c83"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Delete your account and all information related to your account such as your profile page, badges earned and leaderboard positions. Please be aware that all data will be permanently lost if you delete your account."
            }
            fontFamily="Open Sans"
            size="18px"
            wegiht="500"
            color="#191e35"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <ButtonRank
            text={"Delete Account"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
          />
        </Col>
      </Row>
      <Row className={clasess.SaveChanges}>
        <Col>
          <ButtonRank
            text={"Save Changes"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
