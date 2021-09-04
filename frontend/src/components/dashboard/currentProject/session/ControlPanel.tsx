import React, { useState, useEffect } from "react";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Calendar } from "antd";
import SessionPanelList from "./SessionPanelList";
import moment from "moment";

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
  addNewSession: () => void;
}

const ControlPanel: React.FC<Props> = ({ sessions, match, addNewSession }) => {
  const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [filteredSessions, setFilteredSessions] = useState([] as any);
  const [calendarDay, setCalendarDay] = useState<Date>();
  const today: Date = new Date();
  const byDateSessions: Array<Session> = sessions.filter((item: Session) => moment(item.date).format("MMM Do YY") === moment(calendarDay).format("MMM Do YY"));

  useEffect(() => {
    showAllSessions();
  }, []);

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  const dateSelectHandle = () => {
    setFilteredSessions(byDateSessions);
    setCalendarVisible(false);
  };

  const showAllSessions = () => {
    setFilteredSessions(sessions);
  };

  const showTodaySessions = () => {
    const todaySessions: Array<Session> = sessions.filter((item: Session) => moment(item.date).format("MMM Do YY") === moment(today).format("MMM Do YY"));

    setFilteredSessions(todaySessions);
  };

  return (
    <div className="session__control-panel">
      <div className="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="meeting__control-filter" style={{ display: "flex", gap: "5px" }}>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>Sessions</span>
          <Button onClick={showAllSessions}>All</Button>
          <Button onClick={showTodaySessions}>Today</Button>
          <div style={{ position: "relative" }}>
            <Button type="text" onClick={() => setCalendarVisible((prev) => !prev)}>
              <CalendarOutlined />
            </Button>
            {isCalendarVisible && (
              <div className="site-calendar-demo-card" style={{ zIndex: 99999, position: "absolute", left: "-150px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Calendar fullscreen={false} onSelect={(value) => setCalendarDay(value.toDate())} />
                <Button type="primary" onClick={dateSelectHandle}>
                  Select date
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="meeting-header-btns">
          <Button onClick={addNewSession}>
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <div className="meeting__control-content">
        <SessionPanelList sessions={filteredSessions} match={match} />
      </div>
    </div>
  );
};

export default ControlPanel;
