import React, { useEffect, useState } from "react";
import useStyles from "./tabsSimilarityStyles";
import { Tab, Tabs } from "react-bootstrap";
import { TfiMoreAlt } from "react-icons/tfi";
import AllTabs from "./AllTabs";

const TabsSimilarity = ({ ListTabs, PaddingTop = "30px", setRightIndex }) => {
  const classes = useStyles({ PaddingTop });

  const [usageTab, setUsageTab] = useState(
    ListTabs.map((item, index) => (
      <Tab
        eventKey={item.eventKey}
        title={item.title}
        tabClassName={classes.Tab}
        className={classes.InnerTab}
        key={index}
      >
        {item.TabComponent}
      </Tab>
    ))
  );
  const [activeTab, setActiveTab] = useState(ListTabs[0]?.eventKey);
  const [tabsShows, setTabsShows] = useState([usageTab[0]]);

  const expTab = (
    <Tab
      eventKey={"Expand Tabs"}
      title={<TfiMoreAlt />}
      tabClassName={classes.Tab}
      className={classes.InnerTab}
      // key={1} //Must add key here to remove the warning !
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
  useEffect(() => {
    setUsageTab(
      ListTabs.map((item, index) => (
        <Tab
          eventKey={item.eventKey}
          title={item.title}
          tabClassName={classes.Tab}
          className={classes.InnerTab}
          key={index}
        >
          {item.TabComponent}
        </Tab>
      ))
    );
    setActiveTab(ListTabs[0]?.eventKey);
    if (ListTabs.length > 1) {
      setTabsShows([usageTab[0], expTab]);
    } else {
      setTabsShows(usageTab[0]);
    }
  }, [ListTabs]);
  useEffect(() => {
    if (setRightIndex && activeTab !== "Expand Tabs") {
      // console.log(";;;;;;;;;;;", activeTab?.split("-")[1]); //tab-1
      setRightIndex(activeTab?.split("-")[1]);
    }
    // console.log(activeTab);
    if (ListTabs.length > 1) setTabsShows([tabsShows[0], expTab]);
  }, [activeTab]);

  const handleTabSelect = (selectedTabKey) => {
    setActiveTab(selectedTabKey);
  };

  return (
    <Tabs
      className={classes.Tabs}
      activeKey={activeTab}
      onSelect={handleTabSelect}
    >
      {tabsShows}
    </Tabs>
  );
};

export default TabsSimilarity;
