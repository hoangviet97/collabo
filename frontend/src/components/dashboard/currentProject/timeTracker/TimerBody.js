import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

const getThisWeekDates = () => {
  let weekDates = [];

  for (var i = 1; i <= 7; i++) {
    weekDates.push(moment().day(i));
  }

  return weekDates;
};

const TimerBody = ({ records }) => {
  const [finalArr, setFinalArr] = useState([]); // final array for chart
  const [viewAsMinutes, setViewAsMinutes] = useState(true);

  useEffect(() => {
    const currentWeek = getThisWeekDates(); // array of days of the week
    const baseArr = [];
    const clearedArr = [];
    currentWeek.map((date) => baseArr.push({ day: moment(date._d).format("MMM Do YY"), sum: 0, dayText: moment(date._d).format("dddd") }));

    records.filter((item) => moment(item.start).format("MMM Do YY") >= moment(currentWeek[0]).format("MMM Do YY") || moment(item.start).format("MMM Do YY") >= moment(currentWeek[6]).format("MMM Do YY")).map((item) => clearedArr.push({ day: moment(item.start).format("MMM Do YY"), total: viewAsMinutes ? Math.floor(item.total / 60) : Math.floor(item.total / 3600) }));

    if (clearedArr > 0) {
      for (let { day, total } of clearedArr) {
        baseArr.find((x) => x.day === day)["sum"] += total;
      }
    }
    setFinalArr(baseArr);
  }, [records]);

  return (
    <div className="time-body" style={{ width: "100%", height: "55vh", marginTop: "20px", display: "flex", gap: "20px" }}>
      <div className="time-body__chart" style={{ padding: "0 00px", backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", display: "flex", flexDirection: "column", position: "relative", justifyContent: "center", alignItems: "center", clear: "both" }}>
        <ResponsiveBar
          data={finalArr}
          keys={["sum"]}
          indexBy="dayText"
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
      <div className="time-body__chart" style={{ backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", clear: "both" }}></div>
    </div>
  );
};

export default TimerBody;
