import React, { useState } from "react";
import Moderators from "../../Components/Moderators";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import CreateChallengeFooter from "../../Components/CreateChallengeFooter";
import CourseDetails from "../../Components/CourseDetails";
const CreateCourse = () => {
  const [details, setDetails] = useState({
    name: "",
    description: "",
    students: "",
  });

  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value, type, checked, files } = e.target;
      const newValue =
        type === "checkbox" ? checked : type === "file" ? files[0] : value;
      setDetails({ ...details, [name]: newValue });
    } else {
      setDetails({ ...details, [nameVal]: val });
    }
  };

  const tabs = [
    {
      title: "Details",
      eventKey: "Details",
      TabComponent: (
        <CourseDetails details={details} handleChange={handleChange} />
      ),
    },
    {
      title: "Moderators",
      eventKey: "Moderators",
      TabComponent: <Moderators Owner={"NoorAldeen AbuShehadeh"} />,
    },
  ];
  const path = [
    { title: "Courses", url: "#Courses" },
    { title: details.name, url: "#" },
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
        <Row className="m-2 mt-4 mb-2">
          <Text
            text={details.name}
            size={"30px"}
            fontFamily={"OpenSans"}
            color={"#39424e"}
          />
        </Row>
        <Row className="m-2">
          <ChallengeTabs ListTabs={tabs} />
        </Row>
      </Container>
      <CreateChallengeFooter />
    </>
  );
};

export default CreateCourse;
