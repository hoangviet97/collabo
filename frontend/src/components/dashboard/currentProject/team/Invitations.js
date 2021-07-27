import React, { useEffect, useState } from "react";
import MembersHeader from "./header/MembersHeader";
import { getAllProjectInvitations } from "../../../../actions/invitation";
import InvitationItem from "./items/InvitationItem";
import { connect } from "react-redux";
import { Input } from "antd";

const Invitations = (props) => {
  useEffect(() => {
    props.getAllProjectInvitations({ id: props.projectId });
  }, []);

  return (
    <div className="invitations" style={{ marginTop: "20px" }}>
      <MembersHeader />
      {props.invitations.map((item, index) => (
        <InvitationItem invitation={item} key={index} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  invitations: state.invitation.sended
});

export default connect(mapStateToProps, { getAllProjectInvitations })(Invitations);
