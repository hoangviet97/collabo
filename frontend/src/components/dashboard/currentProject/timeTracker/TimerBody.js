import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const TimerBody = () => {
  const data = [
    {
      day: "Monday",
      degress: 59
    },
    {
      day: "Tuesday",
      degress: 61
    },
    {
      day: "Wednesday",
      degress: 55
    },
    {
      day: "Thursday",
      degress: 78
    },
    {
      day: "Friday",
      degress: 71
    },
    {
      day: "Saturday",
      degress: 56
    },
    {
      day: "Sunday",
      degress: 67
    }
  ];

  return (
    <div className="time-body" style={{ width: "100%", height: "50vh", marginTop: "20px", display: "flex", gap: "20px" }}>
      <div className="time-body__chart" style={{ padding: "0 20px", backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", display: "flex", alignItems: "center", clear: "both" }}>
        <ResponsiveBar
          data={data}
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
      <div className="time-body__chart" style={{ backgroundColor: "white", width: "50%", height: "inherit", borderRadius: "12px", clear: "both" }}></div>
    </div>
  );
};

export default TimerBody;
