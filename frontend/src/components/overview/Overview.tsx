import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Button, Progress } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { getProjectTasks } from "../../actions/task";
import { getSessions } from "../../actions/session";
import TaskPreview from "../tasks/TaskPreview";
import SessionPreview from "../session/SessionPreview";
import { Link } from "react-router-dom";

interface Props {
  match: any;
}

const Overview: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootStateOrAny) => state.project.currentProject);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);
  const [completedTasks, setCompletedTasks] = useState<Array<any>>([]);
  const [ongoingTasks, setOngoingTasks] = useState<Array<any>>([]);
  const [openTasks, setOpenTasks] = useState<Array<any>>([]);
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    dispatch(getProjectTasks({ id: match.params.id }));
    dispatch(getSessions({ project_id: match.params.id }));
  }, []);

  useEffect(() => {
    setOngoingTasks(tasks.filter((item: any) => item.statusId === "1"));
    setCompletedTasks(tasks.filter((item: any) => item.statusId === "3"));
    setOpenTasks(tasks.filter((item: any) => item.statusId === "0"));
    setCompleted((completedTasks.length / tasks.length) * 100);
  }, [tasks]);

  return (
    <Container size="30">
      <div className="overview">
        <div className="overview__grid">
          <div className="overview__left-side" style={{ width: "100%" }}>
            <div className="overview__left-cards">
              <div className="overview__card-sm">
                <header className="overview__card-sm-header">
                  <h3>My Tasks</h3>
                </header>
                <div className="overview__tasks-body">
                  {tasks.slice(0, 3).map((item: any) => (
                    <TaskPreview task={item} />
                  ))}
                  <Button style={{ borderRadius: "10px", width: "100%" }}>
                    <Link to="/">See All</Link>
                  </Button>
                </div>
              </div>
              <div className="overview__card-sm">
                <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <h3>Upcoming Sessions</h3>
                </header>
                <div className="overview__session-body">
                  {sessions.length > 0 ? sessions.slice(0, 3).map((item: any) => <SessionPreview session={item} />) : "No Data"}
                  <Button style={{ borderRadius: "10px", width: "100%" }}>
                    <Link to="/">See All</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="overview__chart">mm</div>
          </div>
          <div className="overview__right-side">
            <div className="overview__project-card">
              <h3>{project.name}</h3>
              <div className="overview__tasks-progress">
                <div>
                  <Progress type="circle" strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }} percent={completed} />
                  <h4>Completed</h4>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="overview__progress-circle">{ongoingTasks.length}</div>
                  <h3>Ongoing</h3>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="overview__progress-circle">{openTasks.length}</div>
                  <h3>Open</h3>
                </div>
              </div>
            </div>
            <div className="overview__card-md">
              <h3>Recent Activity</h3>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
