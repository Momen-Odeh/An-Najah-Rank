import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  span: {
    cursor: "pointer",
    userSelect: "none",
    color: "#39424e",
    "&:hover": {
      color: "black",
    },
  },
  line: {
    color: "back",
    width: "40px",
    borderWidth: "2px",
    padding: 0,
    margin: 0,
  },
});

export default useStyle;
