import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    // backgroundColor: "red",
    maxWidth: "1200px",
    marginTop: "25px",
  },
  Row: {
    // backgroundColor: "green",
    gap: "5%",
  },
  Col: {
    // backgroundColor: "cyan",
    margin: "0",
    padding: "0",
  },
  Aside: {
    boxShadow: "0 3px 10px 0 rgba(0,0,0,.1)",
    paddingTop: "25px",
  },
  main: {
    // border: "1px solid black",
  },
});

export default useStyles;
