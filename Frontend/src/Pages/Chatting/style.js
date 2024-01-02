import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  Container: {
    maxWidth: "1200px",
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "2px 2px 4px 2px rgba(0, 0, 0, 0.2)",
    padding: "0",
    // backgroundColor: "red",
  },
  RowContainer: {
    margin: "0",
    padding: "0",
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
    borderRight: "1px solid #c2c7d0",
    paddingTop: "10px",
  },
  PersonInfo: {
    display: "flex",
    padding: "10px",
    gap: "25px",
    borderBottom: "1px #c2c7d0 solid",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#dddddd",
    },
  },
  PersonInfoDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  Conversations: {
    height: "75vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    // height: "75vh",
    overflow: "auto",
    borderRight: "1px solid #c2c7d0",

    // width: "100%",
  },
  RowConv: {},
  Message: {
    // backgroundColor: "red",
    // border: "1px solid red ",
    alignItems: "center",
    gap: "10px",
    padding: "0 10px",
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
    height: "75vh",
    // height: "75vh",
    overflow: "auto",
    paddingTop: "10px",
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
  openNewModal: {
    cursor: "pointer",
    "&:hover": {
      //   backgroundColor: "red",
    },
  },
  EmptyConversation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // backgroundColor: "#dee2e6",
  },
  EmptyConversationInner: {
    backgroundColor: "#dee2e6",
    padding: "7px 10px",
    borderRadius: "15px",
    cursor: "pointer",
  },
});

export default useStyle;
