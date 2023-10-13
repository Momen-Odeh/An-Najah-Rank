import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  maxWidth: {
    maxWidth: "1200px",
    width: "100%",
  },
});

export default useStyles;
