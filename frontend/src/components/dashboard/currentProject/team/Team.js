import React from "react";
import Container from "../../../utils/Container";
import { Tabs, Input } from "antd";
import Members from "./Members";
import Groups from "./Groups";
import InvitePanel from "./invitePanel/InvitePanel";

const Team = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <Container size="30">
      <div className="project-team">
        <div className="project-team_restricted-panel">
          <InvitePanel />
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Active Members" key="1">
            <Members />
          </TabPane>
          <TabPane tab="Groups" key="2">
            <Input style={{ width: "30%" }} placeholder="Search group name" />
            <Groups />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};

export default Team;
