import React from "react";
import { Progress, Button } from "antd";

const Option = ({ data }) => {
  return (
    <div className="option" style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "7px" }}>
      <div className="option__content" style={{ border: "1px solid #dfe4ea", padding: "15px", borderRadius: "8px", width: "80%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <div style={{ color: "#57606f", fontWeight: "bold" }}>{data.text}</div>
          <div>{data.total}</div>
        </div>

        <div className="option__progress" style={{ backgroundColor: "#dfe4ea", width: "100%", height: "6px", borderRadius: "50px" }}>
          <div style={{ backgroundColor: "#1e90ff", width: "50%", height: "6px", borderRadius: "50px" }}></div>
        </div>
      </div>
      <Button type="link">vote</Button>
    </div>
  );
};

export default Option;
