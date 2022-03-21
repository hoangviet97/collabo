import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import BudgetChart from "./BudgetChart";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { getProjectTasks, getStatusGroup } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getProject } from "../../actions/project";
import { getTimeRecordsSum } from "../../actions/time_record";
import { getSessionsLimit } from "../../actions/session";
import TaskPreview from "../tasks/TaskPreview";

const Overview = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const statusGroup = useSelector((state) => state.task.statusGroup);
  const members = useSelector((state) => state.member.members);
  const time = useSelector((state) => state.time_record.sum);
  const project = useSelector((state) => state.project.currentProject);
  const sessions = useSelector((state) => state.session.sessions);

  useEffect(() => {
    dispatch(getProjectTasks({ id: match.params.id }));
    dispatch(getStatusGroup({ id: match.params.id }));
    dispatch(getProject({ id: match.params.id }));
    dispatch(getMembers({ id: match.params.id }));
    dispatch(getTimeRecordsSum({ id: match.params.id }));
    dispatch(getSessionsLimit({ project_id: match.params.id, limit: 4 }));
  }, []);

  return (
    <Container size="30">
      <div class="overview">
        <div class="overview__left">
          <div class="a">
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total tasks</span>
              </div>
              <div style={{ fontSize: "40px" }}>{tasks.length}</div>
            </div>
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ClockCircleOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total time</span>
              </div>
              <div style={{ fontSize: "40px" }}>{Math.floor(time / 60) < 5400 ? `${Math.floor(time / 60)} min` : `${Math.floor(time / 3600)} h`}</div>
            </div>
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TeamOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total members</span>
              </div>
              <div style={{ fontSize: "40px" }}>{members.length}</div>
            </div>
          </div>
          <div class="b" style={{ display: "flex", justifyContent: "center", padding: "35px 20px", width: "100%" }}>
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div class="overview__right">
          <div class="d" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div>
              <h3>Budget spent</h3>
              <span>{project.budget === null ? "Data is not available" : project.budget}</span>
            </div>
          </div>
          <div class="e">
            <h3>Upcoming tasks</h3>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
