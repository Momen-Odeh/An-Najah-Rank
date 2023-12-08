import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "20px",
    fontWeight: "750",
  },
  notificationContainer: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    userSelect: "none",
    cursor: "pointer",
  },
  message: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  sendTime: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "5px",
  },
});
export default useStyles;
