import React, { useEffect, useState } from "react";
import Moderators from "../../Components/Moderators";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import CourseDetails from "../../Components/CourseDetails";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StudentsInCourse from "../../Components/StudentsInCourse";
import ManageContests from "../../Components/ManageContests";
import useStyle from "./style";
import { toastError } from "../../Utils/toast";
const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [contests, setContests] = useState([]);
  useEffect(() => {
    axios
      .get(`/course-info`, {
        params: {
          courseNumber: id,
        },
      })
      .then((res) => {
        setDetails({
          ...details,
          number: res.data.course.courseNumber,
          name: res.data.course.name,
          description: res.data.course.description,
          image: res.data.course.backgroundImage,
          students: res.data.students,
        });
        setOwnerInfo(res.data.course.owner);
        setModerators(res.data.moderators);
        setSuggestionModerators(res.data.suggestionModerators);
        setContests(res.data.contests);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //************* guard done ************************ */
          if (error?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        }
        console.log(error);
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
      urlPattern: `/administration/courses/${id}/details`,
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
      urlPattern: `/administration/courses/${id}/moderators`,
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
      urlPattern: `/administration/courses/${id}/members`,
    },
    {
      title: "Manage Contests",
      eventKey: "ManageContests",
      TabComponent: <ManageContests contests={contests} />,
      urlPattern: `/administration/courses/${id}/contests`,
    },
  ];
  const classes = useStyle();
  return (
    <Container fluid className={classes.Container}>
      <Row className="m-2">
        <Breadcrumbs />
      </Row>

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
  );
};

export default Course;
