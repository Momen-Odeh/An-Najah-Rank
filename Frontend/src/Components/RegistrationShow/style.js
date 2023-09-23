import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Container: {
    backgroundColor: "#000842",
    borderRadius: "15px",
    padding: "7% 10%",
  },
  ColImg: {
    textAlign: "center",
  },
  imgLogIn: {
    width: "80%",
    "@media (max-width: 1024px)": {
      width: "100%",
    },
  },

  imgBG: {
    width: "55%",
    "@media (max-width: 1440px)": {
      width: "50%",
    },
    "@media (max-width: 1180px)": {
      width: "60%",
    },
    "@media (max-width: 1024px)": {
      width: "70%",
    },
  },
});

export default useStyles;
