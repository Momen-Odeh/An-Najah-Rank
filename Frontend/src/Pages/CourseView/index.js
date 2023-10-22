import React from "react";
import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ContestsInCourse from "../../Components/ContestsInCourse";
import Text from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import StudentsInCourse from "../../Components/StudentsInCourse";
import { FaSwatchbook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AiFillFileText } from "react-icons/ai";
import axios from "axios";
import useStyles from "./style";
const CourseView = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [img, setImg] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/course-info", {
        params: {
          courseNumber: id,
        },
      })
      .then((response) => {
        setImg(
          response.data.course.backgroundImage &&
            `data:image/jpeg;base64,${response.data.course.backgroundImage}`
        );
        console.log();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const isAdmin = true;
  const [students, setStudents] = useState([
    {
      registrationNumber: "11923513",
      studentName: "Noor Aldeen",
      email: "s11923513@stu.najah.edu",
    },
    {
      registrationNumber: "11923513",
      studentName: "momen",
      email: "s11923929@stu.najah.edu",
    },
    {
      registrationNumber: "11923513",
      studentName: "mohee",
      email: "s11924789@stu.najah.edu",
    },
    {
      registrationNumber: "11923513",
      studentName: "obaida",
      email: "s11924578@stu.najah.edu",
    },
  ]);
  const [course, setCourse] = useState({
    name: "Data structre and Algorithm",
    description:
      "An Algorithm course is a comprehensive study of fundamental computer algorithms and data structures. It explores efficient problem-solving techniques and teaches students how to design, analyze, and implement algorithms for various computational tasks. This course equips students with essential skills for optimizing software performance and solving complex real-world problems efficiently. Topics often include sorting, searching, graph algorithms, dynamic programming, and algorithmic analysis.",
    contests: [
      {
        ContestName: "An-Najah Rank test1",
        solved: true,
        statistics: [
          { key: "Solved Rate: ", val: "50%" },
          { key: "My Score: ", val: 100 },
        ],
        url: "#test1",
        endDate: new Date(2023, 8, 30, 17, 0, 0),
      },
      {
        ContestName: "An-Najah Rank test2",
        solved: false,
        statistics: [
          { key: "Solved Rate: ", val: "50%" },
          { key: "My Score: ", val: 100 },
        ],
        url: "#test2",
        endDate: new Date(2023, 10, 2, 17, 0, 0),
      },
    ],
  });

  const handleAddContest = (name) => {
    const newContest = {
      ContestName: name,
      solved: false,
      statistics: [
        { key: "Solved Rate: ", val: "0%" },
        { key: "My Score: ", val: 0 },
      ],
      url: "#test3",
      endDate: new Date(2023, 9, 5, 17, 0, 0),
    };
    const updatedCourse = { ...course };
    updatedCourse.contests.push(newContest);
    setCourse(updatedCourse);
  };

  const path = [
    { title: "Courses", url: "#Courses" },
    { title: course.name, url: "#" },
  ];
  const tabs = [
    {
      title: "Course",
      eventKey: "Course",
      TabComponent: (
        <ContestsInCourse
          contests={course.contests}
          isAdmin={isAdmin}
          handleAddContest={handleAddContest}
        />
      ),
      urlPattern: `/course-view/${id}/course`,
    },
    {
      title: "Course Students",
      eventKey: "Course Students",
      TabComponent: (
        <StudentsInCourse students={students} setStudents={setStudents} />
      ),
      urlPattern: `/course-view/${id}/members`,
    },
  ];
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      {img && (
        <Row className={`${clasess.Row} mb-1`}>
          <Col className={`${clasess.Col}`}>
            <img src={img} alt="background Img" />
          </Col>
        </Row>
      )}
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col}`}>
          <Breadcrumbs path={path} />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-4`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <FaSwatchbook className={clasess.Icon} />
          <Text
            text={course.name}
            size="1.8em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-1`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <AiFillFileText className={clasess.Icon} />
          <Text
            text={"Description"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col} ${clasess.descritionCol}`}>
          <span
            className={clasess.descrition}
            dangerouslySetInnerHTML={{
              __html: course.description,
            }}
          />
        </Col>
      </Row>
      {isAdmin ? (
        <Row className={`${clasess.Row} mb-2`}>
          <Col className={`${clasess.Col}`}>
            <ChallengeTabs ListTabs={tabs} />
          </Col>
        </Row>
      ) : (
        <ContestsInCourse
          contests={course.contests}
          isAdmin={isAdmin}
          handleAddContest={handleAddContest}
        />
      )}
    </Container>
  );
};

export default CourseView;
