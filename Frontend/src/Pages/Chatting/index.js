import React from "react";
import UseStyle from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Conversations from "./Conversations";
import ExchangeMessages from "./ExchangeMessages";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";

const chatting = () => {
  const classes = UseStyle();
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.RowContainer}>
        <Col className={`${classes.ConversationsCol} ${classes.Col}`}>
          <Conversations />
        </Col>
        <Col className={classes.ChatCol}>
          <div>
            <ExchangeMessages />
          </div>
          <div className={classes.InputMessageContainer}>
            <div className={classes.InputFiledRank}>
              <InputFiledRank placeholder={"Enter Message"} />
            </div>
            <div>
              <ButtonRank text={"Send"} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default chatting;
