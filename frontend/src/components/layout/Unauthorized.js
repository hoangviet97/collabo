import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

const Unauthorized = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "100px", textAlign: "center" }}>
      <div>
        <CloseCircleOutlined style={{ fontSize: "60px", color: "red" }} />
      </div>
      <h1 style={{ fontSize: "35px" }}>Unauthorized Access</h1>
    </div>
  );
};

export default Unauthorized;
