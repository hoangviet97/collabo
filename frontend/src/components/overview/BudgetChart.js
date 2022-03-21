import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Pie } from "@ant-design/plots";

const BudgetChart = () => {
  const data = [
    {
      type: "分类一",
      value: 27
    },
    {
      type: "分类二",
      value: 25
    },
    {
      type: "分类三",
      value: 18
    },
    {
      type: "分类四",
      value: 15
    },
    {
      type: "分类五",
      value: 10
    },
    {
      type: "其他",
      value: 5
    }
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    width: 50,
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-10%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center"
      }
    },
    interactions: [
      {
        type: "element-active"
      }
    ]
  };
  return <Pie {...config} />;
};

export default BudgetChart;
