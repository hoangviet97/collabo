import React from "react";
import StatusMark from "../../utils/StatusMark";

const InviteItem = (props) => {
  return (
    <div className="invite-item" style={{ transform: `translateY(${props.position}px)` }}>
      <div class="invite-item__name">{props.data.name}</div>
      <div class="invite-item__status" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <StatusMark color="#f29339" />
        {props.data.status}
      </div>
    </div>
  );
};

export default InviteItem;
