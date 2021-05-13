import React from "react";

const InviteItem = (props) => {
  return (
    <div className="invite-item" style={{ transform: `translateY(${props.position}px)` }}>
      <div class="invite-item__name">{props.data.name}</div>
      <div class="invite-item__status">{props.data.status}</div>
    </div>
  );
};

export default InviteItem;
