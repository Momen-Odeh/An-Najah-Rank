import React from "react";
import { ProgressBar } from "react-bootstrap";
import useStyle from "./ProgressBarStyle";
import Text from "../Text";
const ProgressBarRank = ({
  difficulty,
  currentVal,
  maxVal,
  color,
  backgroundColor,
}) => {
  const classes = useStyle({ color, backgroundColor });
  const percentage =
    currentVal == 0 || maxVal == 0
      ? 0
      : ((currentVal / maxVal) * 100).toFixed(2);

  return (
    <div>
      <div className={classes.progressBarHead}>
        <Text text={difficulty} color="#98a1a4" />
        <Text
          text={`${currentVal}/${maxVal}`}
          color="#635f56"
          size="14px"
          wegiht="600"
        />
        <Text
          text={`${percentage}%`}
          size="14px"
          wegiht="600"
          color="#635f56"
        />
      </div>
      <ProgressBar
        now={currentVal}
        max={maxVal}
        className={classes.progressBar}
      />
    </div>
  );
};

export default ProgressBarRank;
