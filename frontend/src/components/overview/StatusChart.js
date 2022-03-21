import React from "react";
import { Column } from "@ant-design/plots";

const StatusChart = ({ data }) => {
  console.log(data);
  const config = {
    data,
    width: 600,
    autoFit: true,
    xField: "name",
    yField: "total",
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
    }
  };

  return <Column {...config} />;
};

export default StatusChart;
