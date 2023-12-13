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
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
import Loader from "../../Components/Loader";
const CourseView = () => {
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({
    contests: [],
  });
  const [students, setStudents] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
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
          isAdmin={role === "professor" || role === "admin"}
          handleAddContest={handleAddContest}
          courseId={id}
        />
      ),
    },
    {
      title: "Course Students",
      eventKey: "Course Students",
      TabComponent: (
        <StudentsInCourse students={students} setStudents={setStudents} />
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("/course-info", {
        params: {
          courseNumber: id,
          courseView: true,
        },
      })
      .then((response) => {
        const { name, description, backgroundImage } = response.data.course;
        const { students, userRole, moderators } = response.data;
        setStudents(students);
        setRole(userRole);
        setCourse({
          ...course,
          name,
          description,
          backgroundImage: backgroundImage
            ? backgroundImage
            : "https://wallpapercrafter.com/desktop/161398-low-poly-digital-art-network-dots-abstract-lines-red-cyan.png",
          contests: response.data?.contests?.map((item) => {
            return {
              ...item,
              Name: item.name,
              url: `/courses/${id}/contests/${item.id}`,
              endDate: item.endDate ? new Date(item.endDate) : null,
            };
          }),
        });
        setLoadingPage(false);
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
        } else setLoadingPage(false);
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      {course.backgroundImage && (
        <Row className={`${classes.Row} mb-2 mt-3`}>
          <Col className={`${classes.Col}`}>
            <img
              src={course.backgroundImage}
              alt="background Img"
              className={classes.BGImg}
            />
          </Col>
        </Row>
      )}
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col}`}>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-4`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <FaSwatchbook className={classes.Icon} />
          <Text
            text={course.name}
            size="1.8em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-1`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <AiFillFileText className={classes.Icon} />
          <Text
            text={"Description"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-4`}>
        <Col className={`${classes.Col} ${classes.descritionCol}`}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{
              __html: course.description,
            }}
          />
        </Col>
      </Row>

      {role === "professor" || role === "admin" ? (
        <Row className={`${classes.Row} mb-2`}>
          <Col className={`${classes.Col}`}>
            <ChallengeTabs ListTabs={tabs} />
          </Col>
        </Row>
      ) : (
        <Row className={`${classes.Row} mb-2`}>
          <Col className={`${classes.Col}`}>
            <ContestsInCourse
              contests={course.contests}
              isAdmin={role === "professor" || role === "admin"}
              handleAddContest={handleAddContest}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CourseView;
