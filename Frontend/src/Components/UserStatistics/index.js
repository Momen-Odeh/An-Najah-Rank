import React, { useState } from "react";
import useStyle from "./style";
import { Col, Container, Row } from "react-bootstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Text from "../Text";
import ProgressBarRank from "./ProgressBarRank";
const UserStatistics = ({ userStatistics }) => {
  const classes = useStyle();

  let allLevel;
  let levels = [];
  for (let i = 0; i < userStatistics.length; i++) {
    if (userStatistics[i].difficulty === "allDifficulty") {
      allLevel = userStatistics[i];
    } else {
      if (userStatistics[i].difficulty === "Easy") {
        levels[0] = {
          ...userStatistics[i],
          color: "#65B741",
          backgroundColor: "#294d35",
        };
      } else if (userStatistics[i].difficulty === "Medium") {
        levels[1] = {
          ...userStatistics[i],
          color: "#f9bc1e",
          backgroundColor: "#5e4e26",
        };
      } else if (userStatistics[i].difficulty === "Hard") {
        levels[2] = {
          ...userStatistics[i],
          color: "#bd3f3c",
          backgroundColor: "#5a302f",
        };
      }
    }
  }
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container className={classes.Container} fluid>
      <Row className={`${classes.Row} `}>
        <Col className={`${classes.CircularProgressCol} `} xs="auto">
          <div
            className={`${classes.CirularCol}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CircularProgressbarWithChildren
              value={allLevel.totalSuccessSubmition}
              maxValue={allLevel.totalSubmition}
              strokeWidth={4}
              styles={buildStyles({
                pathColor: `#FE0000`,
              })}
            >
              <div style={{ textAlign: "center" }}>
                <div>
                  <Text
                    text={
                      isHovered
                        ? `${allLevel.totalSuccessSubmition}/${allLevel.totalSubmition}`
                        : `${
                            allLevel.totalSuccessSubmition == 0 ||
                            allLevel.totalSubmition == 0
                              ? "0"
                              : (
                                  (allLevel.totalSuccessSubmition /
                                    allLevel.totalSubmition) *
                                  100
                                ).toFixed(2)
                          }%`
                    }
                    fontFamily="Open Sans"
                    color="#635f56"
                    size="16px"
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
        <Col className={classes.ColProgresses}>
          {levels.map((item, index) => (
            <ProgressBarRank
              key={index}
              difficulty={item.difficulty}
              currentVal={item.totalSuccessSubmition}
              maxVal={item.totalSubmition}
              color={item.color}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatistics;
