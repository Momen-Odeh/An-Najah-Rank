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
  ColInput: {
    display: "flex",
    alignItems: "center",
  },
  Check: {},
  ButtonSelect: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
export default useStyles;
