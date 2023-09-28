import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
  },
  Form: {
    height: "100%",
    "&:focus": {
      boxShadow: "none",
    },
  },
  Modal: {
    backgroundColor: "red",
  },
  smallWidth: {
    width: "50px",
  },
});
export default useStyles;
