import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    maxWidth: "1200px",
    marginTop: "40px",
  },
  Row: {
    boxShadow: "0 3px 10px 0 rgba(0,0,0,.1)",
    gap: "20px",
    padding: "30px",
  },
  Col: {
    margin: "0",
    padding: "0",
  },
  ColSelect: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    borderRight: "1.5px solid #efeff6",
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "10px",
    rowGap: "25px",
    paddingRight: "30px",
  },
  UserInfoImg: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  AccountImgContainer: {
    display: "flex",
    // flexDirection: "column",
    gap: "10px",
    // justifyContent: "center",
    flexWrap: "wrap",
  },
  SaveChanges: {
    textAlign: "end",
  },
});

export default useStyles;
