import React, { FC } from "react";
import SessionPanelItem from "./SessionPanelItem";
import { session } from "../../../types/types";

interface Props {
  sessions: session[];
}

const SessionPanelList: FC<Props> = ({ sessions }) => {
  return (
    <div className="meeting-panel__list" style={{ marginTop: "20px" }}>
      {sessions.map((item: session) => (
        <SessionPanelItem key={item.id} session={item} />
      ))}
    </div>
  );
};

export default SessionPanelList;
