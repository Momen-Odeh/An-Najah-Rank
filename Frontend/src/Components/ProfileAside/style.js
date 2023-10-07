import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {},
  Row: {
    "&:first-child": {
      textAlign: "center",
    },
  },
  Col: {
    margin: "0",
  },
  Icon: {
    width: "20px",
    height: "20px",
    color: "#000842",
    marginRight: "10px",
  },
  IconContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default useStyles;
