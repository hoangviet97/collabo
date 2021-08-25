import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { getTimeRecords } from "../../../../actions/time_record";

const TimerHeader = (props) => {
  const [total, setTotal] = useState(0);
  const [totalHours, setTotalHours] = useState("");
  const [totalminutes, setTotalMinutes] = useState("");

  useEffect(() => {
    props.data.map((item) => {
      setTotal((prev) => prev + item.total);
    });

    return () => {
      setTotal(0);
    };
  }, [props.data]);

  return (
    <div className="time-header" style={{ backgroundColor: "white", width: "100%", height: "120px", borderRadius: "12px", display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div class="time-header__item" style={{ width: "25%", borderRight: "0.8px solid #ecf0f1" }}>
        <div className="time-header__container" style={{ display: "flex", flexDirection: "column", padding: "0 15px" }}>
          <span>Total Time</span>
          <span style={{ wordSpacing: "2px", fontSize: "32px", fontWeight: "bolder" }}>
            {`${Math.floor(total / 3600)}`.slice(-2)}h {`0${Math.floor(total / 60) % 60}`.slice(-2)}m
          </span>
        </div>
      </div>
      <div class="time-header__item" style={{ width: "25%", borderRight: "0.8px solid #ecf0f1" }}>
        <div className="time-header__container" style={{ display: "flex", flexDirection: "column", padding: "0 15px" }}>
          <span>Time Today</span>
        </div>
      </div>
      <div class="time-header__item" style={{ width: "25%", borderRight: "0.8px solid #ecf0f1" }}>
        <div className="time-header__container" style={{ display: "flex", flexDirection: "column", padding: "0 15px" }}>
          <span>Total Time</span>
        </div>
      </div>
      <div class="time-header__item" style={{ width: "25%" }}>
        <div className="time-header__container" style={{ display: "flex", flexDirection: "column", padding: "0 15px" }}>
          <span>Total Time</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.time_record.records
});

export default connect(mapStateToProps, { getTimeRecords })(TimerHeader);
