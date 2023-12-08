import React, { useState } from "react";
import useStyle from "./style";
import { Col, Container, Row, ProgressBar } from "react-bootstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Text from "../Text";
import ProgressBarRank from "./ProgressBarRank";
const UserStatistics = () => {
  const classes = useStyle();
  const percentage = 28;
  const total = 150;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container className={classes.Container}>
      <Row className={`${classes.Row} `}>
        <Col className={`${classes.Col} `}>
          <div
            className={`${classes.CirularCol}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CircularProgressbarWithChildren
              value={percentage}
              strokeWidth={4}
              styles={buildStyles({
                pathColor: `red`,
              })}
            >
              <div style={{ textAlign: "center" }}>
                <div>
                  <Text
                    text={isHovered ? "15 %" : "15"}
                    size="20px"
                    fontFamily="Open Sans"
                    wegiht="600"
                  />
                </div>
                <Text
                  text={"Solved"}
                  size="20px"
                  fontFamily="Open Sans"
                  wegiht="600"
                />
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </Col>
        <Col>
          <ProgressBarRank
            difficulty={"Easy"}
            currentVal={19}
            maxVal={22}
            color={"#01b49f"}
            backgroundColor={"#294d35"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatistics;
