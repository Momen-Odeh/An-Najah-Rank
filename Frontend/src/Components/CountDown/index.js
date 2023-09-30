import React from 'react';
import Countdown from 'react-countdown';
import useStyle from './Style';
const CountDown = ({ endDate, setIsCompleted }) => {
  const classes = useStyle();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsCompleted(true)
      return (
        <div className={classes.messageContainer}>
          <span>Time's up!</span>
        </div>
      );
    }

    return (
      <div className={classes.countdownContainer}>
        {days ? (
          <div className={classes.countdownItem}>
            <span>{days}</span> day{days !== 1 ? 's' : ''}
          </div>
        ) : (
          ''
        )}
        {hours ? (
          <div className={classes.countdownItem}>
            <span>{hours}</span> hour{hours !== 1 ? 's' : ''}
          </div>
        ) : (
          ''
        )}
        {minutes ? (
          <div className={classes.countdownItem}>
            <span>{minutes}</span> minute{minutes !== 1 ? 's' : ''}
          </div>
        ) : (
          ''
        )}
        {seconds ? (
          <div className={classes.countdownItem}>
            <span>{seconds}</span> second{seconds !== 1 ? 's' : ''}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  return <Countdown date={endDate} renderer={renderer} />;
};

export default CountDown;
