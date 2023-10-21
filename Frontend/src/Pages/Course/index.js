import React, { useEffect, useState } from "react";
import Moderators from "../../Components/Moderators";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import CourseDetails from "../../Components/CourseDetails";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentsInCourse from "../../Components/StudentsInCourse";
const Course = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({
    number: null,
    name: "",
    description: "",
    image: null,
    students: [],
    uploadImg: null,
  });
  const [moderators, setModerators] = useState([]);
  const [suggestionModerators, setSuggestionModerators] = useState([]);
  const [ownerInfo, setOwnerInfo] = useState({
    universityNumber: null,
    name: "",
    email: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/course-info?courseNumber=${id}`)
      .then((res) => {
        setDetails({
          ...details,
          number: res.data.course.courseNumber,
          name: res.data.course.name,
          description: res.data.course.description,
          image: `data:image/jpeg;base64,${res.data.course.backgroundImage}`,
          students: res.data.students,
        });
        setOwnerInfo(res.data.course.owner);
        setModerators(res.data.moderators);
        setSuggestionModerators(res.data.suggestionModerators);
      });
  }, []);

  const tabs = [
    {
      title: "Details",
      eventKey: "Details",
      TabComponent: (
        <CourseDetails
          operation={"update"}
          data={details}
          setData={setDetails}
        />
      ),
      urlPattern: `/course/${id}/details`,
    },
    {
      title: "Moderators",
      eventKey: "Moderators",
      TabComponent: (
        <Moderators
          Owner={ownerInfo}
          moderatorsData={moderators}
          suggestionModerators={suggestionModerators}
        />
      ),
      urlPattern: `/course/${id}/moderators`,
    },
    {
      title: "Course Students",
      eventKey: "Course Students",
      TabComponent: (
        <StudentsInCourse
          students={details.students}
          setStudents={(val) => {
            setDetails({ ...details, students: val });
          }}
        />
      ),
      urlPattern: `/course/${id}/members`,
    },
  ];
  const path = [
    { title: "Courses", url: "#" },
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
        <Row className="m-2 mt-4 mb-4">
          <Text
            text={details.name}
            size={"30px"}
            wegiht="600"
            fontFamily={"OpenSans"}
            color={"#39424e"}
          />
        </Row>
        <Row className="m-2">
          <ChallengeTabs ListTabs={tabs} />
        </Row>
      </Container>
    </>
  );
};

export default Course;
