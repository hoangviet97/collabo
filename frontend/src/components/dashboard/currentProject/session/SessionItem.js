import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useParams } from "react-router-dom";
import { getSession } from "../../../../actions/session";
import { Divider, Spin, Input } from "antd";

const SessionItem = (props) => {
  let { sessionId } = useParams();
  const { TextArea } = Input;

  useEffect(() => {
    props.getSession({ id: sessionId });
  }, [sessionId]);

  return (
    <div>
      <header>
        <span style={{ fontSize: "20px" }}>{props.single.name}</span>
      </header>
      <Divider />
      <div class="session__talking-point" style={{ marginBottom: "30px" }}>
        <span style={{ fontSize: "18px" }}>Talking Points</span>
      </div>
      <div class="session__note">
        <span style={{ fontSize: "18px" }}>Notepad</span>
        <TextArea style={{ padding: "5px 0" }} placeholder="Write down everything you want" bordered={false} autoSize={{ minRows: 3, maxRows: 5 }} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  single: state.session.single,
  loading: state.session.loading
});

export default connect(mapStateToProps, { getSession })(SessionItem);
