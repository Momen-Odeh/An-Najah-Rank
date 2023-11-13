import React, { useContext } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
import userContext from "../../Utils/userContext";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
const CourseView = () => {
  const context = useContext(userContext);
  const { activeUser } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({
    contests: [],
  });
  const [students, setStudents] = useState([]);

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

  const tabs = [
    {
      title: "Contests",
      eventKey: "contests",
      TabComponent: (
        <ContestsInCourse
          contests={course.contests}
          isAdmin={
            activeUser.role === "professor" || activeUser.role === "admin"
          }
          handleAddContest={handleAddContest}
          courseId={id}
        />
      ),
      urlPattern: `/courses/${id}/contests`,
    },
    {
      title: "Course Students",
      eventKey: "Course Students",
      TabComponent: (
        <StudentsInCourse students={students} setStudents={setStudents} />
      ),
      urlPattern: `/courses/${id}/members`,
    },
  ];

  useEffect(() => {
    axios
      .get("/accessCourse", {
        params: {
          courseNumber: id,
        },
      })
      .then((response1) => {
        axios
          .get("/course-info", {
            params: {
              courseNumber: id,
            },
          })
          .then((response) => {
            const { name, description, backgroundImage } = response.data.course;
            const { students, moderators } = response.data;
            setStudents(students);

            setCourse({
              ...course,
              name,
              description,
              backgroundImage: backgroundImage
                ? `data:image/jpeg;base64,${backgroundImage}`
                : "https://wallpapercrafter.com/desktop/161398-low-poly-digital-art-network-dots-abstract-lines-red-cyan.png",
              contests: response.data.contests.map((item) => {
                return {
                  ...item,
                  Name: item.name,
                  url: `/courses/${id}/contests/${item.id}`,
                  endDate: item.endDate ? new Date(item.endDate) : null,
                };
              }),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error1) => {
        console.log(error1);
        if (error1.response.status === 401) {
          toastError("Invalid Access");
          if (error1.response.data.Valid === undefined) {
            navigate("/log-in");
          } else {
            navigate("/");
          }
        }
      });
  }, []);

  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      {course.backgroundImage && (
        <Row className={`${clasess.Row} mb-2 mt-3`}>
          <Col className={`${clasess.Col}`}>
            <img
              src={course.backgroundImage}
              alt="background Img"
              className={clasess.BGImg}
            />
          </Col>
        </Row>
      )}
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col}`}>
          <Breadcrumbs />
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
      <Row className={`${clasess.Row} mb-4`}>
        <Col className={`${clasess.Col} ${clasess.descritionCol}`}>
          <span
            className={clasess.descrition}
            dangerouslySetInnerHTML={{
              __html: course.description,
            }}
          />
        </Col>
      </Row>

      {activeUser.role === "professor" || activeUser.role === "admin" ? (
        <Row className={`${clasess.Row} mb-2`}>
          <Col className={`${clasess.Col}`}>
            <ChallengeTabs ListTabs={tabs} />
          </Col>
        </Row>
      ) : (
        <Row className={`${clasess.Row} mb-2`}>
          <Col className={`${clasess.Col}`}>
            <ContestsInCourse
              contests={course.contests}
              isAdmin={
                activeUser.role === "professor" || activeUser.role === "admin"
              }
              handleAddContest={handleAddContest}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CourseView;
