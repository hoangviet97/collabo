import React, { useEffect, useState } from "react";
import MembersHeader from "./header/MembersHeader";
import { getAllProjectInvitations } from "../../../../actions/invitation";
import InvitationItem from "./items/InvitationItem";
import { connect } from "react-redux";
import { Input } from "antd";

const Invitations = (props) => {
  return (
    <div className="invitations" style={{ marginTop: "20px" }}>
      {props.sended.map((item, index) => (
        <div>{item.id}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sended: state.invitation.sended
});

export default connect(mapStateToProps, { getAllProjectInvitations })(Invitations);
