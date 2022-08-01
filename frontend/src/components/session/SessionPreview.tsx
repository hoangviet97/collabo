import React, { FC } from "react";
import moment from "moment";

interface Props {
  session: any;
}

const SessionPreview: FC<Props> = ({ session }) => {
  return (
    <div className="session-preview" style={{ backgroundColor: "#0275d8", padding: "15px 20px", marginBottom: "7px", borderRadius: "10px", width: "100%", height: "100%" }}>
      <div className="task__detail-base-item" style={{ marginBottom: "17px", color: "white" }}>
        <span style={{ fontSize: "12px", fontWeight: "bolder", color: "white", textTransform: "uppercase" }}>Title</span>
        <span>{session.name}</span>
      </div>
      <div style={{ display: "flex", gap: "60px" }}>
        <div className="task__detail-base-item" style={{ marginBottom: "17px", color: "white" }}>
          <span style={{ fontSize: "12px", fontWeight: "bolder", color: "white", textTransform: "uppercase" }}>Date</span>
          <span>{moment(session.date).format("MMM Do YY")}</span>
        </div>
        <div className="task__detail-base-item" style={{ marginBottom: "17px", color: "white" }}>
          <span style={{ fontSize: "12px", fontWeight: "bolder", color: "white", textTransform: "uppercase" }}>Time</span>
          {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
        </div>
      </div>
      <div className="task__detail-base-item" style={{ marginBottom: "17px", color: "white" }}>
        <span style={{ fontSize: "12px", fontWeight: "bolder", color: "white", textTransform: "uppercase" }}>Place</span>
        <span>{session.place === undefined || session.place === null || session.place.length < 1 ? "No place specified" : session.place}</span>
      </div>
    </div>
  );
};

export default SessionPreview;
