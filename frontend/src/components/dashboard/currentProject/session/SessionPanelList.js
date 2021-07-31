import React from "react";
import SessionPanelItem from "./SessionPanelItem";

const SessionPanelList = (props) => {
  return (
    <div className="meeting-panel__list" style={{ marginTop: "20px" }}>
      {props.sessions.map((item) => (
        <SessionPanelItem key={item.id} match={props.match} session={item} />
      ))}
    </div>
  );
};

export default SessionPanelList;
