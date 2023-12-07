const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const timeAgo = new Date(timestamp);
  const timeDifference = now - timeAgo; // time in ms
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;

  if (timeDifference < minute) {
    return Math.floor(timeDifference / second) + " seconds ago";
  } else if (timeDifference < hour) {
    return Math.floor(timeDifference / minute) + " minutes ago";
  } else if (timeDifference < day) {
    return Math.floor(timeDifference / hour) + " hours ago";
  } else if (timeDifference < month) {
    return Math.floor(timeDifference / day) + " days ago";
  } else if (timeDifference < year) {
    return Math.floor(timeDifference / month) + " months ago";
  } else {
    return Math.floor(timeDifference / year) + " years ago";
  }
};

export default formatTimeAgo;
