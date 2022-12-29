import React from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

const ComingSoon: React.FunctionComponent = () => {
  return (
    <div className="coming-soon">
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
