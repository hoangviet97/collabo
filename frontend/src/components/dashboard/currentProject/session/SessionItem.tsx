import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { getSession } from "../../../../actions/session";
import { getTalkingPoints, createTalkingPoint, updateCheckTalkingPoint } from "../../../../actions/talking_point";
import { Divider, Input, Checkbox } from "antd";
import moment from "moment";

interface Params {
  id: string;
  sessionId: string;
}

const SessionItem = () => {
  const dispatch = useDispatch();
  const single = useSelector((state: RootStateOrAny) => state.session.single);
  const talking_points = useSelector((state: RootStateOrAny) => state.talking_point.list);
  const [talkingPoint, setTalkingPoint] = useState<string>("");
  const { TextArea } = Input;
  let params: Params = useParams();

  useEffect(() => {
    dispatch(getSession({ id: params.sessionId }));
    dispatch(getTalkingPoints({ session_id: params.sessionId }));
  }, [params.sessionId]);

  const talkingPointHandle = (e: any) => {
    e.preventDefault();
    if (talkingPoint.length > 0) {
      dispatch(createTalkingPoint({ session_id: params.sessionId, text: talkingPoint }));
      setTalkingPoint("");
    }
  };

  const pointCheckHandle = (e: any, id: string) => {
    dispatch(updateCheckTalkingPoint({ id: id, val: e.target.checked }));
  };

  return (
    <div>
      <header>
        <span style={{ fontSize: "20px" }}>{single.name}</span>
        <div>
          <span>Created {moment(single.created_at).startOf("hour").fromNow()}</span>
        </div>
      </header>
      <Divider />
      <div className="session__talking-point" style={{ marginBottom: "30px" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Talking Points</span>
        <ul style={{ marginLeft: "20px", listStyleType: "none" }}>
          {talking_points.map((item: any, index: string) => (
            <li key={index}>
              <Checkbox onChange={(e) => pointCheckHandle(e, item.id)} checked={item.checked}>
                {item.checked ? <i>{item.text}</i> : item.text}
              </Checkbox>
            </li>
          ))}
          <li>
            <form onSubmit={talkingPointHandle}>
              <Input style={{ padding: "0px" }} value={talkingPoint} onBlur={talkingPointHandle} onChange={(e) => setTalkingPoint(e.target.value)} placeholder="New point" bordered={false} />
            </form>
          </li>
        </ul>
      </div>
      <div className="session__note">
        <span style={{ fontSize: "18px" }}>Notepad</span>
        <TextArea style={{ padding: "5px 0" }} placeholder="Write down everything you want" bordered={false} autoSize={{ minRows: 3, maxRows: 5 }} />
      </div>
    </div>
  );
};

export default SessionItem;
