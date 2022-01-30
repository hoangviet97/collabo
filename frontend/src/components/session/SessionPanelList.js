import React from "react";
import SessionPanelItem from "./SessionPanelItem";

const SessionPanelList = ({ sessions, match }) => {
  return (
    <div className="meeting-panel__list" style={{ marginTop: "20px" }}>
      {sessions.map((item) => (
        <SessionPanelItem key={item.id} match={match} session={item} />
      ))}
    </div>
  );
};

export default SessionPanelList;
