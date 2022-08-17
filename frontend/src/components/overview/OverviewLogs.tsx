import React from "react";
import LogPreview from "../logs/LogPreview";
import { useSelector, RootStateOrAny } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { log } from "../../types/types";

const OverviewLogs = () => {
  const logs = useSelector((state: RootStateOrAny) => state.log.logs);
  return (
    <>
      <div className="items-center" style={{ marginBottom: "20px" }}>
        <EyeOutlined style={{ marginRight: "8px", fontSize: "25px" }} />
        <div>Activities</div>
      </div>
      <div style={{ width: "100%" }}>
        {logs.slice(0, 3).map((item: log, index: number) => (
          <LogPreview key={index} data={item} />
        ))}
      </div>
    </>
  );
};

export default OverviewLogs;
