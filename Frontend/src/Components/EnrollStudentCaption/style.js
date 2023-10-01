import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Container: {
    padding: "100px 0px",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    backgroundColor: ({ backgroundColor }) => backgroundColor,
  },
  Row: {
    padding: "0",
    margin: "0",
  },
  Col: {
    padding: "0",
    margin: "0",
  },
});

export default useStyles;
