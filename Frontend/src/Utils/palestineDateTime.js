const options = {
  timeZone: "Asia/Gaza",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const palestineDateTime = new Intl.DateTimeFormat("en-US", options).format(
  new Date()
);
export default palestineDateTime;
