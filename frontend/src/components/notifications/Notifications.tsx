import React from "react";
import Container from "../utils/Container";
import { connect } from "react-redux";
import { getAllInvitations, updateSeenStatus } from "../../actions/invitation";
import { Button } from "antd";

interface Invitation {
  id: string;
  sender: string;
  receiver: string;
  created_at: Date;
  projects_id: string;
  seen: number;
  firstname: string;
  lastname: string;
  project_name: string;
}

interface Props {
  invitations: Array<Invitation>;
  updateSeenStatus: any;
}

const Notifications: React.FC<Props> = ({ invitations, updateSeenStatus }) => {
  const seenHandle = (id: string, seen: number) => {
    if (seen === 0) {
      updateSeenStatus({ id: id });
    }
  };

  return (
    <Container size="30">
      <div className="notifications-container">
        <header className="notification__header" style={{ width: "100%", height: "60px", backgroundColor: "grey", borderRadius: "10px", marginBottom: "20px" }}>
          Notifications
        </header>
        {invitations.map((invitation) => (
          <div onClick={() => seenHandle(invitation.id, invitation.seen)} className="invitation__item" style={{ display: "flex", gap: "15px", alignItems: "center", backgroundColor: invitation.seen === 1 ? "white" : "#dff9fb", padding: "15px 20px", borderRadius: "10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
            <div className="invitation__content">
              <strong>
                {invitation.firstname} {invitation.lastname}
              </strong>{" "}
              invites you to <strong>{invitation.project_name}</strong>
            </div>
            <div className="invitation__btn-container" style={{ display: "flex", gap: "5px" }}>
              <Button type="primary">Accept</Button>
              <Button type="primary" danger>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  invitations: state.invitation.invitations
});

export default connect(mapStateToProps, { getAllInvitations, updateSeenStatus })(Notifications);
