import React from "react";
import { Column } from "@ant-design/plots";

const StatusChart = () => {
  const data = [
    {
      type: "家具家电",
      sales: 38
    },
    {
      type: "粮油副食",
      sales: 52
    },
    {
      type: "生鲜水果",
      sales: 61
    },
    {
      type: "美容洗护",
      sales: 145
    },
    {
      type: "母婴用品",
      sales: 48
    }
  ];

  const config = {
    data,
    autoFit: true,
    xField: "type",
    yField: "sales",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: "类别"
      },
      sales: {
        alias: "销售额"
      }
    }
  };

  return <Column {...config} />;
};

export default StatusChart;
