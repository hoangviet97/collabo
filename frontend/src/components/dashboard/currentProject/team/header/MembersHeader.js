import React from "react";

const MembersHeader = () => {
  return (
    <div className="members-header">
      <div className="members-header-item members-column__identity" style={{ textAlign: "left" }}>
        Name
      </div>
      <div className="members-header-item members-column__email">email</div>
      <div className="members-header-item members-column__role">Role</div>
      <div className="members-header-item members-column__tasks">Tasks</div>
      <div className="members-header-item members-column__status">Status</div>
      <div className="members-header-item members-column__more">More</div>
    </div>
  );
};

export default MembersHeader;
