import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
  },
  Form: {
    height: "100%",
    "&:focus": {
      boxShadow: "none",
    },
  },
  Modal: {
    backgroundColor: "red",
  },
  smallWidth: {
    width: "50px",
  },
  iconColor:{
    marginLeft:'10px',
    '&:hover':{
        color:'#4691f6 !important'
    },
  },
});
export default useStyles;
