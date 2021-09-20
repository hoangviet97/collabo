import React, { FC } from "react";
import { Spin } from "antd";

const Spinner: FC = () => {
  return (
    <div className="spinner-container">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
