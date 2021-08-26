import React, { useState, useEffect } from "react";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Calendar } from "antd";
import SessionPanelList from "./SessionPanelList";
import moment from "moment";

const ControlPanel = (props) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [calendarDay, setCalendarDay] = useState("");
  const today = new Date();
  const byDateSessions = props.sessions.filter((item) => moment(item.date).format("MMM Do YY") === moment(calendarDay).format("MMM Do YY"));

  useEffect(() => {
    showAllSessions();
  }, []);

  useEffect(() => {
    setFilteredSessions(props.sessions);
  }, [props.sessions]);

  const dateSelectHandle = () => {
    setFilteredSessions(byDateSessions);
    setCalendarVisible(false);
  };

  const showAllSessions = () => {
    setFilteredSessions(props.sessions);
  };

  const showTodaySessions = () => {
    const todaySessions = props.sessions.filter((item) => moment(item.date).format("MMM Do YY") === moment(today).format("MMM Do YY"));

    setFilteredSessions(todaySessions);
  };

  return (
    <div className="meeting__control-panel" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", width: "450px", borderRadius: "12px", overflowY: "scroll", overflowX: "hidden" }}>
      <div className="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div class="meeting__control-filter" style={{ display: "flex", gap: "5px" }}>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>Sessions</span>
          <Button onClick={showAllSessions}>All</Button>
          <Button onClick={showTodaySessions}>Today</Button>
          <div style={{ position: "relative" }}>
            <Button type="text" onClick={() => setCalendarVisible((prev) => !prev)}>
              <CalendarOutlined />
            </Button>
            {isCalendarVisible && (
              <div className="site-calendar-demo-card" style={{ zIndex: 99999, position: "absolute", left: "-150px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Calendar fullscreen={false} onSelect={(value) => setCalendarDay(value)} />
                <Button type="primary" onClick={dateSelectHandle}>
                  Select date
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="meeting-header-btns">
          <Button onClick={props.addNewSession}>
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <div class="meeting__control-content">
        <SessionPanelList sessions={filteredSessions} project_id={props.project_id} match={props.match} />
      </div>
    </div>
  );
};

export default ControlPanel;
