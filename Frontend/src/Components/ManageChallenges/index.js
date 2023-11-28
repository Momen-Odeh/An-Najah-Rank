import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
const ManageChallenges = ({ challenges }) => {
  const header = ["Challenge Name", "Challenge tags", "Challenge Owner"];
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const classes = useStyles();
  return (
    <Container>
      <Row className={classes.RowChallenge}>
        <Col>
          <InputFiledRank
            type="text"
            placeholder="Type challenge name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"250px"}
          />
        </Col>
        <Col xs="auto">
          <ButtonRank
            text="Create Challenge"
            onClick={() =>
              navigate("/administration/challenges/create-challenge")
            }
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
    </Container>
  );
};

export default ManageChallenges;
