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
    "&:focus": {
      boxShadow: "none",
      borderColor: "#39424e",
    },
  },
});

export default useStyles;
