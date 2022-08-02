import React, { FC } from "react";
import "../../styles/utils/utils.scss";

interface Props {
  onClick: any;
  active: any;
  color: string;
}

const ColorCubic: FC<Props> = ({ onClick, active, color }) => {
  return <div className={active ? "active-cubic" : "cubic"} style={{ backgroundColor: color, width: "50px", height: "50px", borderRadius: "12px" }}></div>;
};

export default ColorCubic;
