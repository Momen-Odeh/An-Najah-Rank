import React from "react";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
const ManageCourses = ({ courses }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const header = ["Course Name", "Course Owner", "Moderators"];
  const clasess = useStyles();
  return (
    <Container>
      <Row className={clasess.RowCreate}>
        <Col>
          <InputFiledRank
            type="text"
            placeholder="Type course name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"250px"}
          />
        </Col>
        <Col xs="auto">
          <ButtonRank
            text="Create Course"
            onClick={() => navigate(`/administration/courses/create-course`)}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable
            TableHeader={header}
            TableData={courses
              .map((item) => ({
                name: item.name,
                owner: item.ownerName,
                moderators: item.moderators,
              }))
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )}
            url={courses
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => `/administration/courses/${item.id}`)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ManageCourses;
