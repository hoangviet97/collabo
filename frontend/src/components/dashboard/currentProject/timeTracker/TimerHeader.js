import React from "react";

const TimerHeader = () => {
  return (
    <div className="time-header" style={{ backgroundColor: "white", width: "100%", height: "120px", borderRadius: "12px", display: "flex", justifyContent: "space-between", padding: "15px" }}>
      <div class="time-header__item" style={{ backgroundColor: "blue", width: "25%" }}>
        <div className="time-header__container">
          <span>Total Time</span>
        </div>
      </div>
      <div class="time-header__item" style={{ backgroundColor: "red", width: "25%" }}>
        <div className="time-header__container">
          <span>Total Time</span>
        </div>
      </div>
      <div class="time-header__item" style={{ backgroundColor: "green", width: "25%" }}>
        <div className="time-header__container">
          <span>Total Time</span>
        </div>
      </div>
      <div class="time-header__item" style={{ backgroundColor: "red", width: "25%" }}>
        <div className="time-header__container">
          <span>Total Time</span>
        </div>
      </div>
    </div>
  );
};

export default TimerHeader;
