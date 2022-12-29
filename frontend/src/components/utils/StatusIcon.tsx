import { MinusCircleFilled, RightCircleFilled, PauseCircleFilled, CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import React from "react";

const StatusIcon = (status: string) => {
  switch (status) {
    case "0":
      return <MinusCircleFilled />;
    case "1":
      return <RightCircleFilled />;
    case "2":
      return <PauseCircleFilled />;
    case "3":
      return <CheckCircleFilled />;
    case "4":
      return <CloseCircleFilled />;
  }
};

export default StatusIcon;
