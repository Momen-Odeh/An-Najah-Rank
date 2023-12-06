import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../Text";
import { Link } from "react-router-dom";

const Course = ({ img, title, url, modirators }) => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.RowCourse}>
        <Col className={`${classes.ColImg} `} xs={4}>
          <img
            className={classes.Img}
            draggable={"false"}
            src={img}
            alt="background"
          />
        </Col>
        <Col className={`${classes.ColInfo} `}>
          <Row>
            <Col>
              <Link to={url} className={classes.Link}>
                <Text
                  text={title}
                  size="20px"
                  fontFamily="Open Sans"
                  wegiht="600"
                />
              </Link>
            </Col>
          </Row>
          <Row>
            {modirators?.map((item, index) => (
              <Col xs={"auto"} key={index}>
                <Text
                  text={item}
                  fontFamily="Open Sans"
                  size="14px"
                  wegiht="600"
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Course;
