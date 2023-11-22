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
      eventKey: "tab1",
      title: "Noor AbuShadeh - 119239513 (22%)",
      TabComponent: <CodeTextArea text={MyCodeStr} />,
    },
    {
      eventKey: "tab2",
      title: "Mohee qwariqe - 11821535 (15%)",
      TabComponent: <CodeTextArea text={"int x"} />,
    },
    {
      eventKey: "tab3",
      title: "Obida Aws - 11927596 (13%)",
      TabComponent: <CodeTextArea text={"int vv "} />,
    },
    {
      eventKey: "tab4",
      title: "Abdallah Adas - 11921856 (10%)",
      TabComponent: <CodeTextArea text={"int gg "} />,
    },
    {
      eventKey: "tab5",
      title: "Rami Salman - 11721856 (8%)",
      TabComponent: <CodeTextArea text={"int ww "} />,
    },
    {
      eventKey: "tab6",
      title: "Layan Zahdeh - 11821856 (5%)",
      TabComponent: (
        <CodeTextArea
          text={`1
          2
          3
          4
          5
          6
          7
          8
          2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8 
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8
      2
      3
      4
      5
      6
      7
      8`}
        />
      ),
    },
  ];
  const Mytab = [
    {
      eventKey: "tab1",
      title: "Momen Hassan Odeh-11923929 (66%)",
      TabComponent: <CodeTextArea text={MyCodeStr} />,
    },
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
          <TabsSimilarity ListTabs={Mytab} PaddingTop="0" />
        </Col>
        <Col className={`${classes.Col} ${classes.SimilarCodes}`}>
          <TabsSimilarity ListTabs={tabContent} PaddingTop="0" />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeSimilarity;
