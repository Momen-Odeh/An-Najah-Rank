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
      <Row className="m-2">
        <Text
          text={"Create Course"}
          size="26px"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </Row>
      <Row className="m-2">
        <CourseDetails operation={"create"} />
      </Row>
    </Container>
  );
};

export default CreateCourse;
