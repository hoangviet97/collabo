import React, { FC } from "react";
import { Tabs } from "antd";
import Container from "../utils/Container";
import AccountSettings from "./AccountSettings";
import { useSelector, RootStateOrAny } from "react-redux";
import AccountDetails from "./AccountDetails";

const UserSettings = () => {
  const profile = useSelector((state: RootStateOrAny) => state.auth.user);
  const { TabPane } = Tabs;

  return (
    <div className="user-settings">
      <Container size="30">
        <h1>My Settings</h1>
        <div className="user-settings-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="My Details" key="1">
              <AccountDetails profile={profile} />
            </TabPane>
            <TabPane tab="Account Settings" key="2">
              <AccountSettings />
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
