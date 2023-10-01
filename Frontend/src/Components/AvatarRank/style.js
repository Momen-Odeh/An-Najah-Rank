import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "35px",
    flexWrap: "wrap",
  },
  AvatarContainer: {
    padding: "0",
    margin: "0",
    // backgroundColor: "red",
    textAlign: "center",
  },
  AvatarImage: {
    marginBottom: "10px",
  },
});

export default useStyles;
