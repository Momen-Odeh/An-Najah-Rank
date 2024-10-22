import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  LoaderCol: {
    textAlign: "center",
  },
  Link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  Container: {
    padding: "0 12%",
    "@media (max-width: 1024px)": {
      padding: "0 7%",
    },
    "@media (max-width: 767px)": {
      padding: "0 20%",
    },
    "@media (max-width: 576px)": {
      padding: "0 0%",
    },
  },
});

export default useStyles;
