import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  button: {
    backgroundColor: "#e4e4e4",
    padding: "5px",
    color: "#211f20",
    fontSize: "23px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.4s",
    "&:hover": {
      backgroundColor: "#b1b1b1",
    },
  },
});

export default useStyle;
