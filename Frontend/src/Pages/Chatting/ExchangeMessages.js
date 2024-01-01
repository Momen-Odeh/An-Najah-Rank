import React from "react";
import useStyle from "./style";
import { Col, Row } from "react-bootstrap";
import Message from "./Message";
import InputFiledRank from "../../Components/InputFiledRank";

const ExchangeMessages = () => {
  const classes = useStyle();
  let x = false;
  return (
    <div className={classes.ExchangeMessages}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (item, index) => (
          <Row key={index} className={classes.Col}>
            <Col className={classes.Col} key={index}>
              <Message key={index} rtl={x} />
              {(x = !x)}
            </Col>
          </Row>
        )
      )}
    </div>
  );
};

export default ExchangeMessages;
