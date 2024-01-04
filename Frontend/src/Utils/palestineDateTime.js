export const getPalestineDateTime = () => {
  const options = {
    timeZone: "Asia/Gaza",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const currentDateTime = new Date();
  currentDateTime.setMinutes(currentDateTime.getMinutes() + 1);
  return new Intl.DateTimeFormat("en-US", options).format(currentDateTime);
};
