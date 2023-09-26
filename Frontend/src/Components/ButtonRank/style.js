import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Button: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: ({ color }) => color,
    fontSize: ({ size }) => size,
    border: ({ border }) => border,
    padding: "10px 15px",
    "&:hover": {
      backgroundColor: ({ hoverBackgroundColor }) => hoverBackgroundColor,
      border: ({ border }) => border,
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
});

export default useStyles;
