import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  Container: {
    maxWidth: "1200px",
    marginTop: "10px",
    marginBottom: "10px",
    paddingTop: "10px",
    boxShadow: "2px 2px 4px 2px rgba(0, 0, 0, 0.2)",
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
    // border: "1px solid purple",
    padding: "0",
    margin: "0",
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
    maxHeight: "75vh",
    overflow: "scroll",
  },
  Message: {
    // backgroundColor: "red",
    // border: "1px solid red ",
    alignItems: "center",
    gap: "10px",
    padding: "0",
    margin: "0",
  },
  MessageAvatar: {
    // backgroundColor: "aqua",
    padding: "0",
  },
  MessageBody: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #c2c7d0",
    padding: "10px",
    borderRadius: "10px",
  },
  ExchangeMessages: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxHeight: "75vh",
    overflow: "scroll",
  },
  InputMessageContainer: {
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px",
    // paddingBottom: "0",
  },
  InputFiledRank: {
    width: "90%",
  },
});

export default useStyle;
