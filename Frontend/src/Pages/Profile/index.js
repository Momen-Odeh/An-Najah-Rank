import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProfileAside from "../../Components/ProfileAside";
import ProfileMain from "../../Components/ProfileMain";
import axios from "axios";
import { useCookies } from "react-cookie";
const Profile = () => {
  const clasess = useStyles();
  const [accountInfo, setAccountInfo] = useState({});
  const [userCouses, setUserCouses] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/user?token=" + cookies.token)
      .then((response) => {
        const imageSrc =
          response.data.img && `data:image/jpeg;base64,${response.data.img}`;
        setAccountInfo({ ...response.data, img: imageSrc });

        axios
          .get("http://127.0.0.1:5000/userCourses?token=" + cookies.token)
          .then((response) => {
            console.log(response.data.courses);
            setUserCouses(
              response.data.courses.map((item) => {
                return { ...item, url: "/courses/" + item.courseNumber };
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Error fetching image:", error);
      });
  }, []);
  return (
    <Container fluid className={clasess.Container}>
      <Row className={clasess.Row}>
        <Col className={`${clasess.Col} ${clasess.Aside}`} xs={3}>
          <ProfileAside accountInfo={accountInfo} />
        </Col>
        <Col className={`${clasess.Col} ${clasess.main}`}>
          <ProfileMain userCouses={userCouses} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
