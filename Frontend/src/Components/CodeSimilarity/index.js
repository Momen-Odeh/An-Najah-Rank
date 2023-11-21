import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import CodeTextArea from "./CodeTextArea";
import TabTable from "../TabTable";
import ChallengeTabs from "../ChallengTabs";
import TabsSimilarity from "./TabsSimilarity";
const CodeSimilarity = () => {
  const MyCodeStr = `int x (){
        return x+y; 
    }
    void main(){
        int c=0;
        int qq =w ;

        cin >> x++;
    }
    void main(){
        int c=0;
        int qq =w ;

        cin >> x++;
    }
    void main(){
        int c=0;
        int qq =w ;

        cin >> x++;
    }`;
  const tabContent = [
    {
      eventKey: "Problem",
      title: "Problem",
      TabComponent: <h1>Problem</h1>,
    },
    {
      eventKey: "Submissions",
      title: "Submissions",
      TabComponent: <h1>Submissions</h1>,
    },
    {
      eventKey: "Leaderboard",
      title: "Leaderboard",
      TabComponent: <h1>Leaderboard</h1>,
    },
    {
      eventKey: "Discussions",
      title: "Discussions",
      TabComponent: <h1>Discussions</h1>,
    },
    // {
    //   eventKey: "ss",
    //   title: "dd",
    //   TabComponent: <h1>Discussions</h1>,
    // },
  ];
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row>
        <Col className={classes.Col}>General Info</Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <Row className={classes.Row}>
        <Col className={`${classes.Col} ${classes.MyCode}`}>
          <CodeTextArea text={MyCodeStr} />
        </Col>
        <Col className={`${classes.Col} ${classes.SimilarCodes}`}>
          <TabsSimilarity ListTabs={tabContent} PaddingTop="0" />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeSimilarity;
