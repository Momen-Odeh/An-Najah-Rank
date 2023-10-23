import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
const ManageContests = ({ contests }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const header = ["Contest Name", "Contest Owner", "Start Date", "End Date"];
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end">
          <ButtonRank
            text="Create Contest"
            color="#ffffff"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
            onClick={() =>
              navigate(`/administration/courses/${id}/contests/create-contest`)
            }
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col></Col>
        <Col md={4} className="d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="Type context name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
    </>
  );
};

export default ManageContests;
