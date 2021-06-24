import React from "react";

const GroupsHeader = () => {
  return (
    <div className="groups-header">
      <div className="groups-header-item groups-column__name">Name</div>
      <div className="groups-header-item groups-column__assignees">Role</div>
      <div className="groups-header-item groups-column__status">Tasks</div>
      <div className="groups-header-item groups-column__priority">More</div>
    </div>
  );
};

export default GroupsHeader;
