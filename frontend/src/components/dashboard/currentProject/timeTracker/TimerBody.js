import React from "react";
import Timer from "./Timer";

const TimerBody = () => {
  return (
    <div className="time-body" style={{ width: "100%", height: "50vh", marginTop: "20px", display: "flex", gap: "20px" }}>
      <div className="time-body__chart" style={{ backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px" }}></div>
      <div className="time-body__chart" style={{ backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px" }}></div>
    </div>
  );
};

export default TimerBody;
