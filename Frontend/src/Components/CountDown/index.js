import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import useStyle from "./Style";
const CountDown = ({ endDate, startDate, setCompletCount }) => {
  const classes = useStyle();

  const startRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setCompletCount(false);
      return <Countdown date={endDate} renderer={renderer} />;
    }

    return (
      <div className={classes.countdownContainer}>
        <div className={classes.countdownTitle}>
          <span>Start After</span>
        </div>
        <div className={classes.countdownItem}>
          <span>{days}</span> day{days !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{hours}</span> hour{hours !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{minutes}</span> minute{minutes !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{seconds}</span> second{seconds !== 1 ? "s" : ""}
        </div>
      </div>
    );
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className={classes.messageContainer}>
          <span>Time's up!</span>
        </div>
      );
    }

    return (
      <div className={classes.countdownContainer}>
        <div className={classes.countdownItem}>
          <span>{days}</span> day{days !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{hours}</span> hour{hours !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{minutes}</span> minute{minutes !== 1 ? "s" : ""}
        </div>
        <div className={classes.countdownItem}>
          <span>{seconds}</span> second{seconds !== 1 ? "s" : ""}
        </div>
      </div>
    );
  };

  return startDate == null ? (
    <Countdown date={endDate} renderer={renderer} />
  ) : (
    <Countdown date={startDate} renderer={startRenderer} />
  );
};

export default CountDown;
