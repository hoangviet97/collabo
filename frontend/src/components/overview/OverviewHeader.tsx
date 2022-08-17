import React from "react";
import { member } from "../../types/types";
import { useSelector, RootStateOrAny } from "react-redux";
import { TeamOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";

const OverviewHeader = () => {
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const time = useSelector((state: RootStateOrAny) => state.time_record.sum);
  const members: member[] = useSelector((state: RootStateOrAny) => state.member.members);

  return (
    <>
      <div className="overview__highlight-item">
        <div className="items-center">
          <FormOutlined className="overview__highlight-icon" />
          <span className="overview__highlight-title">Total tasks</span>
        </div>
        <div className="overview__highlight-value">{tasks.length}</div>
      </div>
      <div className="overview__highlight-item">
        <div className="items-center">
          <ClockCircleOutlined className="overview__highlight-icon" />
          <span className="overview__highlight-title">Total time</span>
        </div>
        <div className="overview__highlight-value">{Math.floor(time / 60) < 5400 ? `${Math.floor(time / 60)} min` : `${Math.floor(time / 3600)} h`}</div>
      </div>
      <div className="overview__highlight-item">
        <div className="items-center">
          <TeamOutlined className="overview__highlight-icon" />
          <span className="overview__highlight-title">Total members</span>
        </div>
        <div className="overview__highlight-value">{members.length}</div>
      </div>
    </>
  );
};

export default OverviewHeader;
