import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import { Tabs, Input, Badge } from "antd";
import Members from "./Members";
import Invitations from "./Invitations";
import InvitationPanel from "./InvitationPanel";
import { connect } from "react-redux";
import { getMembers } from "../../../../actions/member";
import { getAllProjectInvitations } from "../../../../actions/invitation";

const Team = ({ getMembers, getAllProjectInvitations, match, sended }) => {
  const { TabPane } = Tabs;

  useEffect(() => {
    getMembers({ id: match.params.id });
    getAllProjectInvitations({ project: match.params.id });
  }, []);

  function callback(key) {
    console.log(key);
  }

  const inviteHeader = (
    <Badge style={{ position: "relative", left: "5px" }} count={sended.length}>
      Invitations
    </Badge>
  );

  return (
    <Container size="30">
      <div className="project-team">
        <div className="project-team__restricted-area">
          <InvitationPanel project={match.params.id} />
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Active Members" key="1">
            <Members projectId={match.params.id} />
          </TabPane>
          <TabPane tab={inviteHeader} key="3">
            <Invitations projectId={match.params.id} />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  sended: state.invitation.sended
});

export default connect(mapStateToProps, { getAllProjectInvitations, getMembers })(Team);
