import React from 'react';
import Countdown from 'react-countdown';
import useStyle from './Style';
const CountDown = ({ endDate }) => {
  const classes = useStyle();
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
            <span>{days}</span> day{days !== 1 ? 's' : ''}
          </div>
          <div className={classes.countdownItem}>
            <span>{hours}</span> hour{hours !== 1 ? 's' : ''}
          </div>
          <div className={classes.countdownItem}>
            <span>{minutes}</span> minute{minutes !== 1 ? 's' : ''}
          </div>
          <div className={classes.countdownItem}>
            <span>{seconds}</span> second{seconds !== 1 ? 's' : ''}
          </div>
      </div>
    );
  };

  return <Countdown date={endDate} renderer={renderer} />;
};

export default CountDown;
