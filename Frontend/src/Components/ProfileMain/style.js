import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {},
  Row: {},
  Col: {
    margin: "0",
    padding: "0",
  },
  Icon: {
    width: "25px",
    height: "25px",
    color: "#0e141e", //"#000842",
    marginRight: "10px",
  },
  IconContainer: {
    display: "flex",
    alignItems: "center",
  },
  showAll: {
    textAlign: "center",
  },
  linkShow: {
    textDecoration: "none",
    fontSize: "20px",
    fontFamily: "'Open Sans', sans-serif ",
    fontWeight: "600",
    color: "#0e141e",
    transition: "0.3s",
    "&:hover": {
      textDecoration: "none",
      color: "#008fcc",
    },
  },
});

export default useStyles;
