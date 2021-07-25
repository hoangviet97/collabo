import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import { Tabs, Input, Badge } from "antd";
import Members from "./Members";
import Groups from "./Groups";
import Invitations from "./Invitations";
import InvitationPanel from "./InvitationPanel";

const Team = (props) => {
  const { TabPane } = Tabs;

  useEffect(() => {
    console.log(props.match.params.id);
  }, []);

  function callback(key) {
    console.log(key);
  }

  const inviteHeader = (
    <Badge style={{ position: "relative", left: "5px" }} count={24}>
      Invitations
    </Badge>
  );

  return (
    <Container size="30">
      <div className="project-team">
        <div class="project-team__restricted-area">
          <InvitationPanel project={props.match.params.id} />
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Active Members" key="1">
            <Members projectId={props.match.params.id} />
          </TabPane>
          <TabPane tab="Groups" key="2">
            <Input style={{ width: "30%" }} placeholder="Search group name" />
            <Groups />
          </TabPane>
          <TabPane tab={inviteHeader} key="3">
            <Invitations />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};

export default Team;
