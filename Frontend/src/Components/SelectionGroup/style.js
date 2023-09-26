import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Group: {
    width: "150px",
    cursor: "grab",
    "&focus": {
      outline: "none",
      boxShadow: "none",
      border: "2px solid red",
      background: "red",
    },
  },
});

export default useStyles;
