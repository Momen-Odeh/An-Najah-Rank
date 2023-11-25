import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
const AllTabs = ({ tabs, tabsObj, setTabsShows, setActiveTab, tabsShows }) => {
  const classes = useStyles();
  const handelMainTab = (index) => {
    setTabsShows([tabs[index]]);
    setActiveTab(tabsObj[index].eventKey);
    // setTabsShows();
  };
  return (
    <Container fluid className={classes.AllTabs}>
      {tabsObj.map((item, index) => (
        <Row
          className={classes.AllTabsRow}
          onClick={() => handelMainTab(index)}
          key={index}
        >
          <Col key={index} className={classes.AllTabsCol}>
            {item.title}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default AllTabs;
