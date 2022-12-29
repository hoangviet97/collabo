import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { session } from "../../types/types";
import SessionPreview from "../session/SessionPreview";
import moment from "moment";

const OverviewSessions = () => {
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);

  return (
    <>
      <div className="items-center">
        <div className="items-center">
          <FundProjectionScreenOutlined className="overview__sec-icon" />
          <div>Upcoming Sessions</div>
        </div>
        {sessions.filter((item: session) => moment(item.date) > moment()).length > 0 && <div className="blob red"></div>}
      </div>
      <div className="overview__session">
        {sessions.length < 1 ? (
          <div className="overview__session-empty">No data</div>
        ) : (
          sessions
            .filter((item: session) => moment(item.date) > moment())
            .slice(0, 1)
            .map((item: session, index: number) => <SessionPreview key={index} session={item} />)
        )}
      </div>
    </>
  );
};

export default OverviewSessions;
