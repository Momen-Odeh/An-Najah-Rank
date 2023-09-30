import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  countdownContainer: {
    display: "flex",
    fontFamily: "OpenSans, sans-serif",
    textAlign: "center",
    marginBottom: "10px",
  },
  countdownItem: {
    fontSize: "14px",
    margin: "5px",
    padding:'5px',
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    width:'70px'
  },
  messageContainer: {
    fontSize: "14px",
    fontWeight:'600',
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65039",
    color: "#fff",
    borderRadius: "5px",
    padding: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
});

export default useStyle;
