import React from "react";
import { Checkbox, Avatar } from "antd";
import Moment from "react-moment";

const InvitationItem = (props) => {
  return (
    <div className="members-item">
      <div className="members-item__identity">
        <div className="members-item__email">{props.invitation.email}</div>
      </div>
      <div className="members-item__tasks">
        <Moment format="D MMM YYYY">{props.invitation.created_at}</Moment>
      </div>
      <div className="members-item__status" style={{ display: "flex", justifyContent: "center" }}></div>
      <div className="members-item__more">...</div>
    </div>
  );
};

export default InvitationItem;
