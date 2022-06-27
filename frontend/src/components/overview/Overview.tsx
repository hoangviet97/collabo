import React, { useEffect, useContext, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { getProjectTasks, getStatusGroup } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getProject } from "../../actions/project";
import { getSessions } from "../../actions/session";
import { getTimeRecordsSum } from "../../actions/time_record";
import MainSpinner from "../utils/spinners/MainSpinner";
import SocketContext from "../../context/SocketContext";
import { message, Carousel } from "antd";
import CardSkeleton from "../skeletons/CardSkeleton";
import TaskPreview from "../tasks/TaskPreview";
import SessionPreview from "../session/SessionPreview";
import { session, task, member } from "../../types/types";
import { useParams, useLocation, match } from "react-router-dom";

interface Props {
  match: any;
}

const Overview: FC<Props> = ({ match }) => {
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();
  const params: any = useParams();
  const tasks: task[] = useSelector((state: RootStateOrAny) => state.task.tasks);
  const statusGroup = useSelector((state: RootStateOrAny) => state.task.statusGroup);
  const members: member[] = useSelector((state: RootStateOrAny) => state.member.members);
  const time = useSelector((state: RootStateOrAny) => state.time_record.sum);
  const sessions: session[] = useSelector((state: RootStateOrAny) => state.session.filteredSessions);
  const project = useSelector((state: RootStateOrAny) => state.project.currentProject);

  useEffect(() => {
    dispatch(getProjectTasks({ project_id: params.id }));
    dispatch(getStatusGroup({ project_id: params.id }));
    dispatch(getMembers({ project_id: params.id }));
    dispatch(getSessions({ project_id: params.id }));
    dispatch(getTimeRecordsSum({ project_id: params.id }));
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
          <div className="d" style={{ padding: "12px 20px", overflow: "hidden" }}>
            <h3>Upcoming Sessions</h3>
            <div style={{ width: "100%" }}>
              <Carousel>
                <div style={{ height: "100px", width: "100%", backgroundColor: "red" }}></div>
              </Carousel>
            </div>
          </div>
          <div className="e" style={{ padding: "12px 20px" }}>
            <div>
              <h3>Upcoming Tasks</h3>
              <div></div>
            </div>

            <div style={{ marginTop: "18px" }}>
              {tasks.slice(0, 4).map((item: task) => (
                <TaskPreview task={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
