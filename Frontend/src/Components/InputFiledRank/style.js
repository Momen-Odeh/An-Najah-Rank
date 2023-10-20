import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Label: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: "18px",
    fontWeight: "500",
    color: "#696c83",
  },
  Control: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: "18px",
    fontWeight: "500",
    color: "#191e35",
    transition: "0.5s",
    borderTopRightRadius: "0.375rem !important",
    borderBottomRightRadius: "0.375rem !important",
    border: ({ msg }) => (msg ? "1px solid #e40506" : ""),
    "&:focus": {
      boxShadow: "none",
      borderColor: "#39424e",
    },
  },
  IconPassword: {
    backgroundColor: "#ffff",
    border: "none",
    color: "#191e35",
    fontSize: "22px",
  },
  msg: {
    color: "#e40506 !important",
    fontWeight: "500",
  },
});

export default useStyles;
