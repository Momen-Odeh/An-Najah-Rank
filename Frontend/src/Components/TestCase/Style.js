import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  customModal: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  StrengthInput: {
    width: "80px",
  },
  CheckLabel: {
    padding: "0",
    margin: "0",
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: "18px",
    fontWeight: "500",
    color: "#191e35",
  },
  Check: {
    "&:focus": {
      boxShadow: "none",
      borderColor: "#39424e",
    },
  },
});

export default useStyle;
