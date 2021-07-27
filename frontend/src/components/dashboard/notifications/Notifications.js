import React, { useState, useEffect } from "react";
import Container from "../../utils/Container";
import { connect } from "react-redux";
import { getAllInvitations, updateSeenStatus } from "../../../actions/invitation";
import { Button } from "antd";

const Notifications = (props) => {
  const seenHandle = (id, seen) => {
    if (seen === 0) {
      props.updateSeenStatus({ id: id });
    }
  };

  return (
    <Container size="30">
      <div className="notifications-container">
        <header style={{ width: "100%", height: "60px", backgroundColor: "grey", borderRadius: "10px", marginBottom: "20px" }}>Notifications</header>
        {props.invitations.map((invitation) => (
          <div onClick={() => seenHandle(invitation.id, invitation.seen)} className="invitation__item" style={{ display: "flex", gap: "15px", alignItems: "center", backgroundColor: invitation.seen === 1 ? "white" : "#dff9fb", padding: "15px 20px", borderRadius: "10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
            <div className="invitation__content">
              <strong>
                {invitation.firstname} {invitation.lastname}
              </strong>{" "}
              invites you to <strong>{invitation.project_name}</strong>
            </div>
            <div class="invitation__btn-container" style={{ display: "flex", gap: "5px" }}>
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

const mapStateToProps = (state) => ({
  invitations: state.invitation.invitations
});

export default connect(mapStateToProps, { getAllInvitations, updateSeenStatus })(Notifications);
