import React, { useEffect } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined, FundProjectionScreenOutlined, EyeOutlined } from "@ant-design/icons";
import { getProjectTasks, getStatusGroup } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getProject } from "../../actions/project";
import { getSessions } from "../../actions/session";
import { getTimeRecordsSum } from "../../actions/time_record";
import SessionPreview from "../session/SessionPreview";
import { session, log, member } from "../../types/types";
import { useParams } from "react-router-dom";
import { getLogs } from "../../actions/log";
import LogPreview from "../logs/LogPreview";
import color from "../../styles/abstract/variables.module.scss";
import moment from "moment";

const Overview: React.FunctionComponent = () => {
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
    dispatch(getProjectTasks(params.id));
    dispatch(getStatusGroup(params.id));
    dispatch(getMembers({ project_id: params.id }));
    dispatch(getSessions(params.id));
    dispatch(getTimeRecordsSum(params.id));
    dispatch(getLogs(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="overview">
        <div className="overview__left">
          <div className="a">
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
          </div>
          <div className="b">
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div className="overview__right">
          <div className="d" style={{ position: "relative" }}>
            <div className="items-center">
              <div className="items-center">
                <FundProjectionScreenOutlined style={{ marginRight: "8px", fontSize: "25px" }} />
                <div>Upcoming Sessions</div>
              </div>
              {sessions.length > 0 && <div className="blob red"></div>}
            </div>
            <div className="overview__session">
              {sessions.length < 1 ? (
                <div className="overview__session-empty">No data</div>
              ) : (
                sessions
                  .filter((item: session) => moment(item.date) > moment())
                  .slice(0, 1)
                  .map((item: session) => <SessionPreview session={item} />)
              )}
            </div>
          </div>
          <div className="e">
            <div className="items-center" style={{ marginBottom: "20px" }}>
              <EyeOutlined style={{ marginRight: "8px", fontSize: "25px" }} />
              <div>Activities</div>
            </div>
            <div style={{ width: "100%" }}>
              {logs.slice(0, 3).map((item: log) => (
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
