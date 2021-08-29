import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import moment from "moment";
import { connect } from "react-redux";
import { getTimeRecords } from "../../../../actions/time_record";

const getThisWeekDates = () => {
  let weekDates = [];

  for (var i = 1; i <= 7; i++) {
    weekDates.push(moment().day(i));
  }

  //moment(date._d).format("dddd")

  return weekDates;
};

const TimerBody = (props) => {
  const [data2, setData2] = useState([]);
  const [newArr2, setNewArr2] = useState([]);

  useEffect(() => {
    props.getTimeRecords();
  }, []);

  useEffect(() => {
    const myDates = getThisWeekDates();
    const newArr = [];
    const newArr21 = [];
    myDates.map((date) => newArr.push({ day: moment(date._d).format("MMM Do YY"), degress: 20 }));
    setData2(newArr);
    console.log(newArr);

    props.records.filter((item) => moment(item.start).format("MMM Do YY") === moment(myDates[0]).format("MMM Do YY")).map((item) => newArr21.push(item.start));
    setNewArr2(newArr21);

    console.log(newArr2);
  }, [props.records]);

  return (
    <div className="time-body" style={{ width: "100%", height: "50vh", marginTop: "20px", display: "flex", gap: "20px" }}>
      <div className="time-body__chart" style={{ padding: "0 20px", backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", display: "flex", alignItems: "center", clear: "both" }}>
        <ResponsiveBar
          data={data2}
          keys={["degress"]}
          indexBy="day"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          colors="#3182CE"
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0
          }}
        />
      </div>
      <div className="time-body__chart" style={{ backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", clear: "both" }}>
        {newArr2.map((item) => (
          <div>{moment(item).format("MMM Do YY")}</div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  records: state.time_record.records
});

export default connect(mapStateToProps, { getTimeRecords })(TimerBody);
