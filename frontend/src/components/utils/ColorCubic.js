import React from "react";
import "../../styles/utils/utils.scss";

const ColorCubic = ({ active, color }) => {
  return <div className={active ? "active-cubic" : "cubic"} style={{ backgroundColor: color, width: "50px", height: "50px", borderRadius: "12px" }}></div>;
};

export default ColorCubic;
