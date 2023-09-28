import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  maxWidth: {
    maxWidth: "1200px",
    width: "100%",
    // backgroundColor: "red",
  },
});

export default useStyles;
