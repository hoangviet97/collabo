import React, { useEffect, useState } from "react";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import socket from "../../../../service/socket";
import { Button, Progress } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { getProjectTasks } from "../../../../actions/task";
import { getSessions } from "../../../../actions/session";
import TaskPreview from "../../tasks/TaskPreview";
import SessionPreview from "../../currentProject/session/SessionPreview";
import { Link } from "react-router-dom";

const Overview = (props) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [myTask, setMyTask] = useState([]);

  useEffect(() => {
    props.getProjectTasks({ id: props.match.params.id });
    props.getSessions({ project_id: props.match.params.id });
  }, []);

  useEffect(() => {
    setCompletedTasks(props.tasks.filter((item) => item.statusId === "1"));
    setCompletedTasks(props.tasks.filter((item) => item.statusId === "3"));
    setOpenTasks(props.tasks.filter((item) => item.statusId === "0"));
  }, [props.tasks]);

  return (
    <Container size="30">
      <div className="overview" style={{ height: "calc(100vh - 120px)" }}>
        <div class="overview__grid">
          <div class="overview__left-side" style={{ width: "100%" }}>
            <div class="overview__left-cards" style={{ display: "flex", gap: "15px", width: "100%" }}>
              <div class="overview__card-sm" style={{ backgroundColor: "white", padding: "15px", width: "50%", borderRadius: "12px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <h3>My Tasks</h3>
                  <Button shape="round">
                    <CaretDownOutlined />
                    By date
                  </Button>
                </header>
                <div class="overview__tasks-body">
                  {props.tasks.slice(0, 3).map((item) => (
                    <TaskPreview task={item} />
                  ))}
                  <Button style={{ borderRadius: "10px", width: "100%" }}>
                    <Link>See All</Link>
                  </Button>
                </div>
              </div>
              <div class="overview__card-sm" style={{ backgroundColor: "white", padding: "15px", width: "50%", borderRadius: "12px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <h3>Upcoming Sessions</h3>
                  <Button shape="round">
                    <CaretDownOutlined />
                    By date
                  </Button>
                </header>
                <div class="overview__session-body">
                  {props.sessions.length > 0 ? props.sessions.slice(0, 3).map((item) => <SessionPreview session={item} />) : "No Data"}
                  <Button style={{ borderRadius: "10px", width: "100%" }}>
                    <Link>See All</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div class="overview__chart" style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
              mm
            </div>
          </div>
          <div class="overview__right-side">
            <div class="overview__project-card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
              <h3>{props.project.name}</h3>
              <div class="overview__tasks-progress" style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <Progress
                    type="circle"
                    width="80px"
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068"
                    }}
                    percent={((completedTasks.length / props.tasks.length) * 100).toFixed(1)}
                  />
                  <h4>Completed</h4>
                </div>
                <div>
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "white", border: "4px solid #95afc0", display: "flex", justifyContent: "center", alignItems: "center" }}>{ongoingTasks.length}</div>
                  <h3>Ongoing</h3>
                </div>
                <div>
                  <Progress type="circle" percent={openTasks.length} format={(percent) => `${percent}`} />
                </div>
              </div>
            </div>
            <div class="overview__card-md" style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
              <h3>Recent Activity</h3>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  project: state.project.currentProject,
  tasks: state.task.tasks,
  sessions: state.session.sessions
});

export default connect(mapStateToProps, { getProjectTasks, getSessions })(Overview);
