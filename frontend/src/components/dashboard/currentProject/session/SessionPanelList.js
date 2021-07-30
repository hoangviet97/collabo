import React, { useEffect } from "react";
import { connect } from "react-redux";
import SessionPanelItem from "./SessionPanelItem";
import { getSessions } from "../../../../actions/session";

const SessionPanelList = (props) => {
  useEffect(() => {
    props.getSessions({ project_id: props.project_id });
  }, []);

  return (
    <div className="meeting-panel__list" style={{ marginTop: "20px" }}>
      {props.sessions.map((item) => (
        <SessionPanelItem key={item.id} session={item} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sessions: state.session.sessions
});

export default connect(mapStateToProps, { getSessions })(SessionPanelList);
