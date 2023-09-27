import React from "react";
import { FaCheck } from "react-icons/fa";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { Col, Container, Form, Row } from "react-bootstrap";
import useStyles from "./style";
const LeadboardTab = () => {
  const classes = useStyles();
  const TableHeader = ["Rank", "User", "Score", "Time", "Country"];
  const submitions = [
    {
      Rank: "1",
      User: "Momen Odeh",
      Score: "30.0",
      Time: "15:00",
      Country: "Palestine",
    },
    {
      Rank: "1",
      User: "Noor Aldeen AbuShehadeh",
      Score: "30.0",
      Time: "18:00",
      Country: "Palestine",
    },
    {
      Rank: "1",
      User: "Mohee Qwariq",
      Score: "30.0",
      Time: "19:00",
      Country: "Palestine",
    },
  ];

  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowHead} mb-3`}>
        <Col className={classes.ColHead}>
          <Form.Control
            type="text"
            placeholder="Type username"
            className={classes.Form}
          />
          <ButtonRank
            text={"Search"}
            backgroundColor="#2ec866"
            color="#F0F0F4"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TabTable submitions={submitions} TableHeader={TableHeader} />
        </Col>
      </Row>
    </Container>
  );
};

export default LeadboardTab;
