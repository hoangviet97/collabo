import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Button, Progress } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { ResponsiveBar } from "@nivo/bar";
import { getProjectTasks } from "../../actions/task";
import { getSessions } from "../../actions/session";
import { getTimeRecords } from "../../actions/time_record";
import TaskPreview from "../tasks/TaskPreview";
import SessionPreview from "../session/SessionPreview";
import { Link } from "react-router-dom";

const Overview = ({ match }) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);
  const tasks = useSelector((state) => state.task.tasks);
  const times = useSelector((state) => state.timers.timers);
  const sessions = useSelector((state) => state.session.sessions);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    dispatch(getProjectTasks({ id: match.params.id }));
    dispatch(getSessions({ project_id: match.params.id }));
    dispatch(getTimeRecords({ project_id: match.params.id }));
  }, []);

  useEffect(() => {
    setOngoingTasks(tasks.filter((item) => item.statusId === "1"));
    setCompletedTasks(tasks.filter((item) => item.statusId === "3"));
    setOpenTasks(tasks.filter((item) => item.statusId === "0"));
    setCompleted((completedTasks.length / tasks.length) * 100);
    setTimes(times);
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
                  {tasks.slice(0, 3).map((item) => (
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
                  {sessions.length > 0 ? sessions.slice(0, 3).map((item) => <SessionPreview session={item} />) : "No Data"}
                  <Button style={{ borderRadius: "10px", width: "100%" }}>
                    <Link to="/">See All</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="overview__chart">
              <div className="overview__chart-box">
                <ResponsiveBar
                  data={times}
                  keys={["sum"]}
                  indexBy="dayText"
                  margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                  padding={0.4}
                  valueScale={{ type: "linear" }}
                  colors="#3182CE"
                  animate={true}
                  enableLabel={false}
                  axisTop={null}
                  axisRight={null}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0
                  }}
                />
              </div>
            </div>
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
