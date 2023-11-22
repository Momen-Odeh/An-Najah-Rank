import React, { useEffect, useState } from "react";
import useStyles from "./tabsSimilarityStyles";
import { Tab, Tabs } from "react-bootstrap";
import { TfiMoreAlt } from "react-icons/tfi";
import AllTabs from "./AllTabs";

const TabsSimilarity = ({ ListTabs, PaddingTop = "30px" }) => {
  const classes = useStyles({ PaddingTop });
  const [activeTab, setActiveTab] = useState(ListTabs[0]?.eventKey);
  const [expandTabs, setExpandTabs] = useState(false);
  const usageTab = ListTabs.map((item) => (
    <Tab
      eventKey={item.eventKey}
      title={item.title}
      tabClassName={classes.Tab}
      className={classes.InnerTab}
    >
      {item.TabComponent}
    </Tab>
  ));
  const [tabsShows, setTabsShows] = useState([usageTab[0]]);

  const expTab = (
    <Tab
      eventKey={"Expand Tabs"}
      title={<TfiMoreAlt />}
      tabClassName={classes.Tab}
      className={classes.InnerTab}
    >
      <AllTabs
        tabsObj={ListTabs}
        tabs={usageTab}
        setTabsShows={setTabsShows}
        tabsShows={tabsShows}
        setActiveTab={setActiveTab}
      />
    </Tab>
  );
  const handleTabSelect = (selectedTabKey) => {
    console.log(selectedTabKey);
    if (selectedTabKey === "Expand Tabs") {
      setActiveTab("tab1");
      setExpandTabs(!expandTabs);
    }
    setActiveTab(selectedTabKey);
  };

  useEffect(() => {
    if (ListTabs.length > 1) setTabsShows([tabsShows[0], expTab]);
  }, [activeTab]);

  return (
    <Tabs
      className={classes.Tabs}
      activeKey={activeTab}
      onSelect={handleTabSelect}
      act
    >
      {tabsShows}
    </Tabs>
  );
};

export default TabsSimilarity;
