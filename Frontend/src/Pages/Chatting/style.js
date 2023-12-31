import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  Container: {
    maxWidth: "1200px",
    // backgroundColor: "red",
  },
  Col: {
    padding: "0",
    margin: "0",
  },
  ConversationsCol: {
    // border: "1px solid black",
    maxWidth: "350px",
  },
  ChatCol: {
    border: "1px solid purple",
  },
  newChat: {
    justifyContent: "space-between",
    padding: "15px 10px",
    borderBottom: "1px #c2c7d0 solid",
  },
  PersonInfo: {
    display: "flex",
    padding: "10px",
    gap: "25px",
    borderBottom: "1px #c2c7d0 solid",
    // backgroundColor: "red",
  },
  PersonInfoDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  Conversations: {
    maxHeight: "85vh",
    overflow: "scroll",
  },
});

export default useStyle;
