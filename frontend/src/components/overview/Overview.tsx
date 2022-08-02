import React, { useEffect, useContext, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined, FundProjectionScreenOutlined, EyeOutlined } from "@ant-design/icons";
import { getProjectTasks, getStatusGroup, getPersonalTasks } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getProject } from "../../actions/project";
import { getSessions } from "../../actions/session";
import { getTimeRecordsSum } from "../../actions/time_record";
import MainSpinner from "../utils/spinners/MainSpinner";
import { message, Carousel, Divider } from "antd";
import SessionPreview from "../session/SessionPreview";
import { session, task, member } from "../../types/types";
import { useParams } from "react-router-dom";
import { getLogs } from "../../actions/log";
import LogPreview from "../logs/LogPreview";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  match: any;
}

const Overview: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const statusGroup = useSelector((state: RootStateOrAny) => state.task.statusGroup);
  const members: member[] = useSelector((state: RootStateOrAny) => state.member.members);
  const time = useSelector((state: RootStateOrAny) => state.time_record.sum);
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);
  const project = useSelector((state: RootStateOrAny) => state.project.currentProject);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const logs = useSelector((state: RootStateOrAny) => state.log.logs);
  const auth = useSelector((state: RootStateOrAny) => state.auth.user);

  useEffect(() => {
    dispatch(getProjectTasks({ project_id: params.id }));
    dispatch(getStatusGroup({ project_id: params.id }));
    dispatch(getMembers({ project_id: params.id }));
    dispatch(getSessions({ project_id: params.id }));
    dispatch(getTimeRecordsSum({ project_id: params.id }));
    dispatch(getLogs({ project_id: params.id }));

    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <Container size="50">
      <div className="overview">
        <div className="overview__left">
          <div className="a">
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined style={{ fontSize: "25px", marginRight: "10px", zIndex: 888 }} />
                <span style={{ fontSize: "16px", zIndex: 888 }}>Total tasks</span>
              </div>
              <div style={{ fontSize: "35px", zIndex: 888 }}>{tasks.length}</div>
            </div>
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ClockCircleOutlined style={{ fontSize: "30px", marginRight: "10px", zIndex: 888 }} />
                <span style={{ fontSize: "16px", zIndex: 888 }}>Total time</span>
              </div>
              <div style={{ fontSize: "35px", zIndex: 888 }}>{Math.floor(time / 60) < 5400 ? `${Math.floor(time / 60)} min` : `${Math.floor(time / 3600)} h`}</div>
            </div>
            <div className="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TeamOutlined style={{ fontSize: "30px", marginRight: "10px", zIndex: 888 }} />
                <span style={{ fontSize: "16px", zIndex: 888 }}>Total members</span>
              </div>
              <div style={{ fontSize: "35px", zIndex: 888 }}>{members.length}</div>
            </div>
          </div>
          <div className="b">
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div className="overview__right">
          <div className="d" style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FundProjectionScreenOutlined style={{ marginRight: "8px", fontSize: "25px" }} />
                <div>Upcoming Sessions</div>
              </div>
              {sessions.length > 0 && <div className="blob red"></div>}
            </div>
            <div className="overview__session">
              {sessions.slice(0, 1).map((item: any) => (
                <SessionPreview session={item} />
              ))}
            </div>
          </div>
          <div className="e">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <EyeOutlined style={{ marginRight: "8px", fontSize: "25px" }} />
              <div>Activities</div>
            </div>
            <div style={{ width: "100%" }}>
              {logs.slice(0, 3).map((item: any) => (
                <LogPreview data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
