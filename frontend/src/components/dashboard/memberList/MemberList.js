import React from "react";
import MemberItem from "./MemberItem";

const MemberList = ({ members }) => {
  return (
    <div className="member-list">
      {members.map((member) => (
        <MemberItem member={member} />
      ))}
    </div>
  );
};

export default MemberList;
