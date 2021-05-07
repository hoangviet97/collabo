import React from "react";
import Container from "../../../utils/Container";
import Toolbar from "../../Toolbar";
import { Tabs } from "antd";
import Members from "./Members";
import Groups from "./Groups";

const Team = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <Container size="30">
      <div className="project-team">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Members" key="1">
            <Members />
          </TabPane>
          <TabPane tab="Groups" key="2">
            <Groups />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};

export default Team;
