import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import EnrollStudentHero from "../../Components/EnrollStudentHero";
import EnrollStudentCaption from "../../Components/EnrollStudentCaption";
import AvatarRank from "../../Components/AvatarRank";

const EnrollStudent = () => {
  const users = [
    {
      name: "Dr. samer Arandi",
      img: "https://staff.najah.edu/media/profiles/thumbnails/2020/09/27/1394_MjQSuJt.png.300x0_q85_crop-smart_upscale-true.jpg",
    },
    {
      name: "Dr. Raed Alqadi",
      img: "https://eng-old.najah.edu/sites/eng-old.najah.edu/files/ra2ed.jpg",
    },
    {
      name: "Dr. Anas Toma",
      img: "https://media.licdn.com/dms/image/C5603AQHjHOKvQPXsuQ/profile-displayphoto-shrink_800_800/0/1517404985464?e=2147483647&v=beta&t=8wXTg_nZVOlbdYQDLM7elkpozECHjHSp-e94th8GuVY",
    },
    {
      name: "Dr. Aladdin Masri",
      img: "https://media.licdn.com/dms/image/C4E03AQEH-D3s_FvHLg/profile-displayphoto-shrink_800_800/0/1517276114069?e=2147483647&v=beta&t=8RrcQOmh5tXDuLO_bhDEAL9oPwWZ50ZLEgy5_vfNh90",
    },
  ];
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <EnrollStudentHero />
        </Col>
      </Row>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <EnrollStudentCaption
            title={"Description"}
            body={
              <Text
                color="#39424E"
                text="Please provide a short description of your contest here! This will also be used as metadata."
                fontFamily="open-scene"
                wegiht="600"
              />
            }
          />
        </Col>
      </Row>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <EnrollStudentCaption
            title={"Professors "}
            body={<AvatarRank users={users} />}
            backgroundColor="#fff"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollStudent;
