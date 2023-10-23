import React from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
const ManageCourses = ({ courses }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const header = ["Course Name", "Course Owner", "Moderators"];
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end">
          <ButtonRank
            text="Create Course"
            color="#ffffff"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
            onClick={() => navigate(`/administration/courses/create-course`)}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col></Col>
        <Col md={4} className="d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="Type course name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
    </>
  );
};

export default ManageCourses;
