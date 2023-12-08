import React from "react";
import { ProgressBar } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";
const ProgressBarRank = ({
  difficulty,
  currentVal,
  maxVal,
  color,
  backgroundColor,
}) => {
  const classes = useStyle({ color, backgroundColor });
  console.log(color, backgroundColor);
  return (
    <>
      <br />
      <div>
        <div className={classes.progressBarHead}>
          <Text text={difficulty} />
          <Text text={`${currentVal}/${maxVal}`} />
          <Text text={`${(currentVal / maxVal).toFixed(3) * 100}%`} />
        </div>
        <ProgressBar
          now={currentVal}
          max={maxVal}
          className={classes.progressBar}
        />
      </div>
    </>
  );
};

export default ProgressBarRank;
