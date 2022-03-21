import React from "react";
import moment from "moment";

const SessionPreview = ({ session }) => {
  return (
    <div className="session-preview" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#ecf0f1", padding: "15px 10px", marginBottom: "7px", borderRadius: "10PX" }}>
      <span>{session.name}</span>
      <span>{moment(session.date).format("MMM Do YY")}</span>
    </div>
  );
};

export default SessionPreview;
