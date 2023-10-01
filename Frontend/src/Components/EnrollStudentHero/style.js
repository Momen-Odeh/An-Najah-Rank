import { createUseStyles } from "react-jss";
import image from "./image/ml.jpg";
const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
    textAlign: "center",

    height: "60vh",
    WebkitBackgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundImage: `url(${image})`,
  },
  Row: {
    padding: "0",
    margin: "0",
  },
  Col: {
    padding: "0",
    margin: "0",
  },
});

export default useStyles;
