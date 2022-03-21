import React from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

const ComingSoon = () => {
  return (
    <div className="coming__soon" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
      <div>
        <div>
          <FieldTimeOutlined style={{ fontSize: "60px" }} />
        </div>
        <h1 style={{ fontSize: "40px" }}>Coming Soon</h1>
      </div>
    </div>
  );
};

export default ComingSoon;
