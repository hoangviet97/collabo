import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { getProjectTasks, getStatusGroup } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getProject } from "../../actions/project";
import { getTimeRecordsSum } from "../../actions/time_record";

interface Props {
  match: any;
}

const Overview: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const statusGroup = useSelector((state: RootStateOrAny) => state.task.statusGroup);
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const time = useSelector((state: RootStateOrAny) => state.time_record.sum);
  const project = useSelector((state: RootStateOrAny) => state.project.currentProject);

  useEffect(() => {
    dispatch(getProjectTasks({ project: match.params.id }));
    dispatch(getStatusGroup({ id: match.params.id }));
    dispatch(getMembers({ id: match.params.id }));
    dispatch(getTimeRecordsSum({ id: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <div className="overview">
        <div className="overview__left">
          <div className="a">
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total tasks</span>
              </div>
              <div style={{ fontSize: "40px" }}>{tasks.length}</div>
            </div>
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ClockCircleOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total time</span>
              </div>
              <div style={{ fontSize: "40px" }}>{Math.floor(time / 60) < 5400 ? `${Math.floor(time / 60)} min` : `${Math.floor(time / 3600)} h`}</div>
            </div>
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TeamOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total members</span>
              </div>
              <div style={{ fontSize: "40px" }}>{members.length}</div>
            </div>
          </div>
          <div className="b" style={{ display: "flex", justifyContent: "center", padding: "35px 20px", width: "100%" }}>
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div className="overview__right">
          <div className="d" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div>
              <h3>Budget spent</h3>
              <span>{project.budget === null ? "Data is not available. Please set your budget first." : project.budget}</span>
            </div>
          </div>
          <div className="e">
            <h3>Upcoming tasks</h3>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
