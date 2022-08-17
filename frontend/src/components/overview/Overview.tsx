import React, { useEffect } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "./StatusChart";
import { getProjectTasks, getStatusGroup } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { getSessions } from "../../actions/session";
import { getTimeRecordsSum } from "../../actions/time_record";
import { useParams } from "react-router-dom";
import { getLogs } from "../../actions/log";
import OverviewHeader from "./OverviewHeader";
import OverviewLogs from "./OverviewLogs";
import OverviewSessions from "./OverviewSessions";

const Overview: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const statusGroup = useSelector((state: RootStateOrAny) => state.task.statusGroup);

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
            <OverviewHeader />
          </div>
          <div className="b">
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div className="overview__right">
          <div className="d" style={{ position: "relative" }}>
            <OverviewSessions />
          </div>
          <div className="e">
            <OverviewLogs />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
