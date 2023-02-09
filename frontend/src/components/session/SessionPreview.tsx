import React, { FC } from "react";
import moment from "moment";
import { session } from "../../types/types";

interface Props {
  session: session;
}

const SessionPreview: FC<Props> = ({ session }) => {
  return (
    <div className="session__preview">
      <div className="task__detail-base-item session__preview-item">
        <span className="session__preview-title">Title</span>
        <span>{session.name}</span>
      </div>
      <div style={{ display: "flex", gap: "60px" }}>
        <div className="task__detail-base-item session__preview-item">
          <span className="session__preview-title">Date</span>
          <span>{moment(session.date).format("MMM Do YY")}</span>
        </div>
        <div className="task__detail-base-item session__preview-item">
          <span className="session__preview-title">Time</span>
          {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
        </div>
      </div>
      <div className="task__detail-base-item session__preview-item">
        <span className="session__preview-title">Place</span>
        <span>{session.place === undefined || session.place === null || session.place.length < 1 ? "No place specified" : session.place}</span>
      </div>
    </div>
  );
};

export default SessionPreview;
