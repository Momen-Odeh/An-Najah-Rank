import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    maxWidth: "1200px",
    marginTop: "25px",
  },
  Row: {
    gap: "3%",
    rowGap: "10px",
  },
  Col: {
    // margin: "0",
    // padding: "0",
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
});

export default useStyles;
