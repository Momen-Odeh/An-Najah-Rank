import React from "react";
import useStyles from "./style";
import { Tab, Tabs } from "react-bootstrap";
import ProblemDescription from "../ProblemDescription";

const ChallengeTabs = () => {
  const classes = useStyles();
  return (
    <Tabs className={classes.Tabs}>
      <Tab
        eventKey="Problem"
        title="Problem"
        tabClassName={classes.Tab}
        className={classes.InnerTab}
      >
        <ProblemDescription />
      </Tab>
      <Tab
        eventKey="Submissions"
        title="Submissions"
        tabClassName={classes.Tab}
        className={classes.InnerTab}
      >
        Tab 2 Content
      </Tab>
      <Tab
        eventKey="Leaderboard"
        title="Leaderboard"
        tabClassName={classes.Tab}
        className={classes.InnerTab}
      >
        Tab 3 content
      </Tab>
      <Tab
        eventKey="Discussions"
        title="Discussions"
        tabClassName={classes.Tab}
        className={classes.InnerTab}
      >
        sss
      </Tab>
    </Tabs>
  );
};

export default ChallengeTabs;
