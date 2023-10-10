import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProfileAside from "../../Components/ProfileAside";
import ProfileMain from "../../Components/ProfileMain";
const Profile = () => {
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      <Row className={clasess.Row}>
        <Col className={`${clasess.Col} ${clasess.Aside}`} xs={3}>
          <ProfileAside />
        </Col>
        <Col className={`${clasess.Col} ${clasess.main}`}>
          <ProfileMain />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
