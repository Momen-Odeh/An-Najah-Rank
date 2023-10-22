import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0 20px",
    maxWidth: "1200px",
    // backgroundColor: "red",
  },
  Row: {
    padding: "0",
    margin: "0",
  },
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
  descrition: {
    color: "#0e141e",
    fontSize: "18px",
    padding: "0",
    margin: "0",
  },
  descritionCol: {
    paddingLeft: "35px",
  },
});

export default useStyles;
