import React from "react";
import { ResponsivePie } from "@nivo/pie";

const BudgetChart = () => {
  const data = [
    {
      id: "java",
      label: "java",
      value: 30,
      color: "hsl(90, 70%, 50%)"
    },
    {
      id: "erlang",
      label: "erlang",
      value: 70,
      color: "hsl(56, 70%, 50%)"
    }
  ];
  return (
    <>
      <ResponsivePie data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }} innerRadius={0.5} padAngle={0.7} cornerRadius={3} activeOuterRadiusOffset={8} borderWidth={1} borderColor={{ from: "color", modifiers: [["darker", 0.2]] }} arcLinkLabelsSkipAngle={10} arcLinkLabelsTextColor="#333333" arcLinkLabelsThickness={2} arcLinkLabelsColor={{ from: "color" }} arcLabelsSkipAngle={10} arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }} />
    </>
  );
};

export default BudgetChart;
