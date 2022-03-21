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
  const [recordsObj, setRecordsObj] = useState([]);

  useEffect(() => {
    setRecordsObj([records]);
    console.log(typeof recordsObj);
    const currentWeek = getThisWeekDates(); // array of days of the week
    console.log(currentWeek);
    const baseArr = [];
    const clearedArr = [];
    currentWeek.map((date) => baseArr.push({ day: moment(date._d).format("MMM Do YY"), sum: 0, dayText: moment(date._d).format("dddd") }));
    console.log(records);
    //records.filter((item) => moment(item.start).format("MMM Do YY") >= moment(currentWeek[0]).format("MMM Do YY") || moment(item.start).format("MMM Do YY") >= moment(currentWeek[6]).format("MMM Do YY")).map((item) => clearedArr.push({ day: moment(item.start).format("MMM Do YY"), total: viewAsMinutes ? Math.floor(item.total / 60) : Math.floor(item.total / 3600) }));

    console.log(baseArr);

    records.forEach((element) => {
      baseArr.find((x) => x.day === moment(element.starts).format("MMM Do YY"))["sum"] += Math.floor(element.total / 60);
    });

    console.log(baseArr);

    setFinalArr(baseArr);
  }, [records]);

  return (
    <div className="time-body">
      <div className="time-body__chart">
        <ResponsiveBar
          data={finalArr}
          keys={["sum"]}
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
    </div>
  );
};

export default TimerBody;
