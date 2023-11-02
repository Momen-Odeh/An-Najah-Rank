import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  button: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    padding: "5px",
    color: "#211f20",
    fontSize: "23px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.4s",
    "&:hover": {
      backgroundColor: ({ hoverBackgroundColor }) => hoverBackgroundColor,
    },
  },
});

export default useStyle;
