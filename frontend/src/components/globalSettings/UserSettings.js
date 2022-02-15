import React, { FC } from "react";
import { Tabs } from "antd";
import Container from "../utils/Container";
import AccountSettings from "./AccountSettings";
import { useSelector } from "react-redux";

const UserSettings = () => {
  const profile = useSelector((state) => state.auth.user);
  const { TabPane } = Tabs;

  return (
    <div className="user-settings">
      <Container size="30">
        <h1>My Settings</h1>
        <div className="user-settings-content">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Appereances" key="1"></TabPane>
            <TabPane tab="Account Settings" key="2">
              <AccountSettings profile={profile} />
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