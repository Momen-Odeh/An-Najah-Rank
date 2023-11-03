import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Avatar from "react-avatar";
import Text from "../Text";
import ButtonRank from "../ButtonRank";
import { Link } from "react-router-dom";

const Course = ({ img, title, url, modirators }) => {
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      <Row className={clasess.RowCourse}>
        <Col className={`${clasess.ColImg} `} xs={4}>
          <img className={clasess.Img} draggable={"false"} src={img} />
        </Col>
        <Col className={`${clasess.ColInfo} `}>
          <Row>
            <Col>
              <Link to={url} className={clasess.Link}>
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
            {modirators.map((item, index) => (
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
