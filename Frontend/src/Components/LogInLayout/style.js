import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Row: {
    // backgroundColor: "red",
    // border: "2px solid green",
    margin: "10px 0",
    height: "96vh",
  },
  ColLeft: {
    // backgroundColor: "blue",
    // border: "1px solid red",
  },
  ColRight: {
    // backgroundColor: "green",
    // border: "1px solid blue",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
});

export default useStyles;
