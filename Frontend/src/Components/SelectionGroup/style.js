import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Group: {},
  Select: {
    // color: "red",
    width: "200px",
    padding: "10px",
    cursor: "pointer",
    border: "1px solid #c2c7d0",
    "&:focus": {
      boxShadow: "none",
      border: "1.5px solid #c2c7d0",
    },
  },
});

export default useStyles;
