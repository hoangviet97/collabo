import React, { useEffect } from "react";
import Container from "../utils/Container";
import { Tabs, Badge } from "antd";
import Members from "./Members";
import Invitations from "./Invitations";
import InvitationPanel from "./InvitationPanel";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMembers } from "../../actions/member";
import { getAllProjectInvitations } from "../../actions/invitation";
import { useParams, useHistory } from "react-router-dom";

const Team: React.FunctionComponent = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const sended = useSelector((state: RootStateOrAny) => state.invitation.sended);

  useEffect(() => {
    dispatch(getMembers({ project_id: params.id }));
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
            <Members />
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
