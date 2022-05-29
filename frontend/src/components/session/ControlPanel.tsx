import React, { useState, useEffect, FC } from "react";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Calendar } from "antd";
import SessionPanelList from "./SessionPanelList";
import moment from "moment";

interface Props {
  sessions: any;
  match: any;
  addNewSession: any;
}

const ControlPanel: FC<Props> = ({ sessions, match, addNewSession }) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [calendarDay, setCalendarDay] = useState();
  const today = new Date();
  const byDateSessions = sessions.filter((item: any) => moment(item.date).format("MMM Do YY") === moment(calendarDay).format("MMM Do YY"));

  useEffect(() => {
    showAllSessions();
  }, []);

  useEffect(() => {
    const upcoming = sessions.filter((item: any) => moment(item.date).format("MMM Do YY") > moment(calendarDay).format("MMM Do YY"));
    setFilteredSessions(upcoming);
  }, [sessions]);

  const dateSelectHandle = () => {
    setFilteredSessions(byDateSessions);
    setCalendarVisible(false);
  };

  const showAllSessions = () => {
    const upcoming = sessions.filter((item: any) => moment(item.date).format("MMM Do YY") >= moment(calendarDay).format("MMM Do YY"));
    setFilteredSessions(upcoming);
  };

  const showTodaySessions = () => {
    const todaySessions = sessions.filter((item: any) => moment(item.date).format("MMM Do YY") === moment(today).format("MMM Do YY"));

    setFilteredSessions(todaySessions);
  };

  const showPastSessions = () => {
    const pastSessions = sessions.filter((item: any) => moment(item.date).format("MMM Do YY") < moment(today).format("MMM Do YY"));

    setFilteredSessions(pastSessions);
  };

  return (
    <div className="session__control-panel">
      <div className="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="meeting__control-filter" style={{ display: "flex", gap: "5px" }}>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>Sessions</span>
          <Button onClick={showAllSessions}>Active</Button>
          <Button onClick={showTodaySessions}>Today</Button>
          <Button onClick={showPastSessions}>Past</Button>
          <div style={{ position: "relative" }}>
            <Button type="text" onClick={() => setCalendarVisible((prev) => !prev)}>
              <CalendarOutlined />
            </Button>
            {isCalendarVisible && (
              <div className="site-calendar-demo-card" style={{ zIndex: 99999, position: "absolute", left: "-150px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Calendar fullscreen={false} onSelect={(value: any) => setCalendarDay(value.toDate())} />
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
