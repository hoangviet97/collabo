import React from "react";
import { Spin } from "antd";
import MainSpinner from "./spinners/MainSpinner";

const Spinner = () => {
  return (
    <div className="spinner-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <MainSpinner />
    </div>
  );
};

export default Spinner;
