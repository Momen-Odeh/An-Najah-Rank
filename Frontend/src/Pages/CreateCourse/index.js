import React, { useState } from "react";
import Moderators from "../../Components/Moderators";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import CourseDetails from "../../Components/CourseDetails";
const CreateCourse = () => {
  const path = [
    { title: "Courses", url: "/administration/courses" },
    { title: "Create Course", url: "#" },
  ];
  return (
    <>
      <Container>
        <Row className="m-2">
          <Breadcrumbs path={path} />
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2 mt-4 mb-4">
          <Text
            text={"Create Course"}
            size={"30px"}
            fontFamily={"OpenSans"}
            color={"#39424e"}
          />
        </Row>
        <Row className="m-2">
          <CourseDetails operation={"create"} />
        </Row>
      </Container>
    </>
  );
};

export default CreateCourse;
