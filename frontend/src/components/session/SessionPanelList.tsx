import React from "react";
import SessionPanelItem from "./SessionPanelItem";

interface Session {
  id: string;
  project_id: string;
  name: string;
  date: Date;
  start: Date;
  end: Date;
  description?: string;
  created_at: Date;
}

interface Props {
  sessions: Array<Session>;
  match: any;
}

const SessionPanelList: React.FC<Props> = ({ sessions, match }) => {
  return (
    <div className="meeting-panel__list" style={{ marginTop: "20px" }}>
      {sessions.map((item: Session) => (
        <SessionPanelItem key={item.id} match={match} session={item} />
      ))}
    </div>
  );
};

export default SessionPanelList;
