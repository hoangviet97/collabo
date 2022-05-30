import React, { FC } from "react";
import { Column } from "@ant-design/plots";

interface Props {
  data: any;
}

const StatusChart: FC<Props> = ({ data }) => {
  const config = {
    data,
    width: 600,
    autoFit: true,
    xField: "name",
    yField: "total",
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
