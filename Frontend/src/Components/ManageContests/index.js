import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
const ManageContests = ({ contests }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const header = ["Contest Name", "Contest Owner", "Start Date", "End Date"];
  const clasess = useStyles();
  return (
    <Container>
      <Row className={clasess.Row}>
        <Col>
          <InputFiledRank
            type="text"
            width={"250px"}
            placeholder="Type context name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={"auto"} className={clasess.AddCol}>
          <ButtonRank
            text={"Create Contest"}
            hoverBackgroundColor="#0e141e"
            onClick={() =>
              navigate(`/administration/courses/${id}/contests/create-contest`)
            }
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable
            TableHeader={header}
            TableData={contests
              .map((item) => ({
                name: item.name,
                ownerName: item.ownerName,
                startDate: item.startDate,
                endDate: item.endDate,
              }))
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )}
            url={contests
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map(
                (item) => `/administration/courses/${id}/contests/${item.id}`
              )}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ManageContests;
