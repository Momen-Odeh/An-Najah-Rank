import React, { useState } from "react";
import Moderators from "../../Components/Moderators";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import CourseDetails from "../../Components/CourseDetails";
import useStyles from "./style";
const CreateCourse = () => {
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      <Row className="m-2">
        <Breadcrumbs />
      </Row>
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
  );
};

export default CreateCourse;
