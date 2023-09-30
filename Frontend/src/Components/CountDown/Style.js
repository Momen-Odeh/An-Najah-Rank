import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  countdownContainer: {
    display: "flex",
    fontFamily: "OpenSans, sans-serif",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
  },
  countdownItem: {
    fontSize: "16px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  messageContainer: {
    fontSize: "24px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ed1b24",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
});

export default useStyle;
