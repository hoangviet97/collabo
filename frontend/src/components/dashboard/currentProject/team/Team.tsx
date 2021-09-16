import React, { useEffect, FC } from "react";
import Container from "../../../utils/Container";
import { Tabs, Badge } from "antd";
import Members from "./Members";
import Invitations from "./Invitations";
import InvitationPanel from "./InvitationPanel";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMembers } from "../../../../actions/member";
import { getAllProjectInvitations } from "../../../../actions/invitation";

interface Props {
  match: any;
}

const Team: FC<Props> = ({ match }) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const sended = useSelector((state: RootStateOrAny) => state.invitation.sended);

  useEffect(() => {
    dispatch(getMembers({ id: match.params.id }));
    dispatch(getAllProjectInvitations({ project: match.params.id }));
  }, []);

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
        <Tabs defaultActiveKey="1">
          <TabPane tab="Active Members" key="1">
            <Members projectId={match.params.id} />
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
