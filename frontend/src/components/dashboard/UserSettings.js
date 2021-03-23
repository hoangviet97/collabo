import React from "react";
import { Tabs } from "antd";
import Container from "../utils/Container";

const UserSettings = () => {
  const { TabPane } = Tabs;
  return (
    <div className="user-settings">
      <Container size="30">
        <h1>My Settings</h1>
        <div class="user-settings-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Appereances" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Account Settings" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Security" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default UserSettings;
