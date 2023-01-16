import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import { Tabs, Badge } from "antd";
import MembersPage from "./members/MembersPage";
import InvitationsPage from "./invitations/InvitationsPage";
import InvitationPanel from "../../components/invitationPanel/InvitationPanel";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMembers } from "../../redux/actions/member";
import { getAllProjectInvitations } from "../../redux/actions/invitation";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const Team: React.FunctionComponent = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const sended = useSelector((state: RootStateOrAny) => state.invitation.sended);

  useEffect(() => {
    dispatch(getMembers(params.id));
    dispatch(getAllProjectInvitations(params.id));
  }, []);

  const inviteHeader = (
    <Badge style={{ position: "relative", left: "5px" }} count={sended.length}>
      Invitations
    </Badge>
  );

  return (
    <Container size="50">
      <div className="team">
        {user_role === "Member" ? (
          ""
        ) : (
          <div className="project-team__restricted-area">
            <InvitationPanel />
          </div>
        )}

        <Tabs defaultActiveKey="1">
          <TabPane tab="Active Members" key="1">
            <MembersPage />
          </TabPane>
          <TabPane tab={inviteHeader} key="3">
            <InvitationsPage />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};

export default Team;
