import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, useParams } from "react-router-dom";
import { getSession } from "../../../../actions/session";
import { getTalkingPoints, createTalkingPoint } from "../../../../actions/talking_point";
import { Divider, Spin, Input } from "antd";

const SessionItem = (props) => {
  let { sessionId } = useParams();
  const { TextArea } = Input;
  const [talkingPoint, setTalkingPoint] = useState("");

  useEffect(() => {
    props.getSession({ id: sessionId });
    props.getTalkingPoints({ session_id: sessionId });
  }, [sessionId]);

  const talkingPointHandle = (e) => {
    e.preventDefault();
    if (talkingPoint.length > 0) {
      props.createTalkingPoint({ session_id: sessionId, text: talkingPoint });
      setTalkingPoint("");
    }
  };

  return (
    <div>
      <header>
        <span style={{ fontSize: "20px" }}>{props.single.name}</span>
      </header>
      <Divider />
      <div class="session__talking-point" style={{ marginBottom: "30px" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Talking Points</span>
        <ul style={{ marginLeft: "20px" }}>
          {props.talking_points.map((item) => (
            <li>{item.text}</li>
          ))}
          <li>
            <form onSubmit={talkingPointHandle}>
              <Input style={{ padding: "0px" }} value={talkingPoint} onBlur={talkingPointHandle} onChange={(e) => setTalkingPoint(e.target.value)} placeholder="New point" bordered={false} />
            </form>
          </li>
        </ul>
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
  loading: state.session.loading,
  talking_points: state.talking_point.list
});

export default connect(mapStateToProps, { getSession, getTalkingPoints, createTalkingPoint })(SessionItem);
