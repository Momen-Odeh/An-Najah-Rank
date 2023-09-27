import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
  },
  RowHead: {},
  ColHead: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
  },
  Form: {
    width: "300px",
    height: "100%",
    "&:focus": {
      boxShadow: "none",
    },
  },
});

export default useStyles;
