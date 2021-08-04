import React from "react";
import moment from "moment";

const SessionPreview = (props) => {
  return (
    <div className="session-preview" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#ecf0f1", padding: "10px 10px", marginBottom: "7px", borderRadius: "10PX" }}>
      <span>{props.session.name}</span>
      <span>{moment(props.session.date).format("MMM Do YY")}</span>
    </div>
  );
};

export default SessionPreview;
