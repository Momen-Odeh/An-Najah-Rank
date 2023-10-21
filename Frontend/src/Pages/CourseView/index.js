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
const CourseView = () => {
  const [showDescription, setShowDescription] = useState(false);
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
    name: "Algorithm",
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
        endDate: new Date(2023, 9, 2, 17, 0, 0),
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
      urlPattern: "/course-view/course",
    },
    {
      title: "Course Students",
      eventKey: "Course Students",
      TabComponent: (
        <StudentsInCourse students={students} setStudents={setStudents} />
      ),
      urlPattern: "/course-view/members",
    },
  ];
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  return (
    <>
      <Container>
        <Row className="m-2">
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2">
          <Col>
            <Text text={course.name} wegiht={500} size={"1.5em"} />{" "}
            <Link
              className="ms-2"
              style={{ textDecoration: "none" }}
              onClick={toggleDescription}
            >
              Description
              <BiSolidRightArrow />
            </Link>
            <Collapse in={showDescription}>
              <div id="description" className="m-3">
                {course.description}
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      {isAdmin ? (
        <Container>
          <Row className="m-2">
            <Col>
              <ChallengeTabs ListTabs={tabs} />
            </Col>
          </Row>
        </Container>
      ) : (
        <ContestsInCourse
          contests={course.contests}
          isAdmin={isAdmin}
          handleAddContest={handleAddContest}
        />
      )}
    </>
  );
};

export default CourseView;
