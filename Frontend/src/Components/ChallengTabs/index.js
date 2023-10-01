import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ChallengeTabs = ({ ListTabs, PaddingTop = "30px" }) => {
  const navigate = useNavigate()
  const classes = useStyles({ PaddingTop });
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(ListTabs[0].eventKey);

  const handleTabSelect = (selectedTabKey) => {
    const selectedTab = ListTabs.find((tab) => tab.eventKey === selectedTabKey);
    if (selectedTab && selectedTab.urlPattern) {
      navigate(selectedTab.urlPattern);
    }
  };
  useEffect(() => {
    const currentPathname = location.pathname;
    for (const tab of ListTabs) {
      if (currentPathname.includes(tab.urlPattern)) {
        setActiveTab(tab.eventKey);
        break;
      }
    }
  }, [location.pathname]);

  return (
    <Tabs className={classes.Tabs} activeKey={activeTab} onSelect={handleTabSelect} id="challenge-tabs">
      {ListTabs.map((item, index) => (
        <Tab
          key={index}
          eventKey={item.eventKey}
          title={item.title}
          tabClassName={classes.Tab}
          className={classes.InnerTab}
        >
          {item.TabComponent}
        </Tab>
      ))}
    </Tabs>
  );
};

export default ChallengeTabs;