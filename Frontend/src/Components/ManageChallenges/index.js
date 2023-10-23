import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ManageChallenges = ({ challenges }) => {
  const header = ["Challenge Name", "Challenge tags", "Challenge Owner"];
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end">
          <ButtonRank
            text="Create Challenge"
            color="#ffffff"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
            onClick={() =>
              navigate("/administration/challenges/create-challenge")
            }
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col></Col>
        <Col md={4} className="d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="Type challenge name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable
            TableHeader={header}
            TableData={challenges
              .map((item) => ({
                name: item.name,
                tags: item.tags,
                owner: item.ownerName,
              }))
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )}
            url={challenges
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => `/administration/challenges/${item.id}`)}
          />
        </Col>
      </Row>
    </>
  );
};

export default ManageChallenges;
