import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Course from "../Course";
import Text from "../Text";
import { ImBooks } from "react-icons/im";
import { PiCodeBold } from "react-icons/pi";
import ChallengeInContest from "../ChallengeInContest";
import ChallengeShow from "../ChallengeShow";
const ProfileMain = ({ userCouses }) => {
  const clasess = useStyles();
  // const CoursesData = [
  //   {
  //     img: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230706095706/intro-data-structure-%E2%80%93-1.png",
  //     title: "Data Structure and Algorithms",
  //     url: "",
  //     modirators: ["Dr. Samer Arandi", "Dr. Raed Alqadi"],
  //   },
  //   {
  //     img: "https://d1ng1bucl7w66k.cloudfront.net/ghost-blog/2022/08/Screen-Shot-2022-08-09-at-7.03.38-AM.png",
  //     title: "Object Oriented Programming",
  //     url: "",
  //     modirators: ["Dr. Ashraf Armosh", "Dr. Manar Qamhia"],
  //   },
  //   {
  //     img: "https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1282569/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png",
  //     title: "Data Base",
  //     url: "",
  //     modirators: ["Dr. Sufian Samara"],
  //   },
  // ];
  const LatestChallenge = [
    {
      Name: "An-Najah Rank test2",
      solved: true,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
    {
      Name: "An-Najah Rank test2",
      solved: false,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
    {
      Name: "An-Najah Rank test2",
      solved: false,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
  ];
  return (
    <Container fluid className={clasess.Container}>
      <Row className={`${clasess.Row} mb-3`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <ImBooks className={clasess.Icon} />
          <Text
            text={"My Courses"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {userCouses.map((item, index) => (
        <Row className={`${clasess.Row} mb-4`} key={index}>
          <Col className={`${clasess.Col}`}>
            <Course {...item} />
          </Col>
        </Row>
      ))}
      <Row className={`${clasess.Row} mt-5 mb-3`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <PiCodeBold className={clasess.Icon} />
          <Text
            text={"Latest Challenges"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {LatestChallenge.map((item, index) => (
        <Row className={`${clasess.Row} mb-4`} key={index}>
          <Col className={`${clasess.Col}`}>
            <ChallengeShow {...item} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileMain;
