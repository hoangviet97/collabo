import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { getSession, getParticipants } from "../../redux/actions/session";
import { getTalkingPoints, createTalkingPoint, updateCheckTalkingPoint } from "../../redux/actions/talking_point";
import { getNote, updateNote, createNote } from "../../redux/actions/note";
import { Divider, Input, Checkbox, Skeleton } from "antd";
import moment from "moment";
import { AppDispatch } from "../../redux/store";
import AssigneesBox from "../assignees/AssigneesBox";

const SessionItem: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootStateOrAny) => state.session.singleLoading);
  const single = useSelector((state: RootStateOrAny) => state.session.single);
  const participants = useSelector((state: RootStateOrAny) => state.session.participants);
  const note = useSelector((state: RootStateOrAny) => state.note.note);
  const talking_points = useSelector((state: RootStateOrAny) => state.talking_point.list);
  const [talkingPoint, setTalkingPoint] = useState<string>("");
  const { TextArea } = Input;
  const [noteText, setNoteText] = useState<string>("");
  let params: any = useParams();

  useEffect(() => {
    dispatch(getSession(params.sessionId, params.id));
    dispatch(getParticipants(params.sessionId, params.id));
    dispatch(getTalkingPoints(params.sessionId, params.id));
    dispatch(getNote(params.id, params.sessionId));

    if (note !== undefined) {
      setNoteText(note.text);
    }
  }, [params.sessionId]);

  useEffect(() => {
    if (note !== undefined) {
      setNoteText(note.text);
    }
  }, [note]);

  const talkingPointHandle = (e: any) => {
    e.preventDefault();
    if (talkingPoint.length > 0) {
      dispatch(createTalkingPoint(params.sessionId, params.id, talkingPoint));
      setTalkingPoint("");
    }
  };

  const pointCheckHandle = (e: boolean, id: string) => {
    dispatch(updateCheckTalkingPoint(params.sessionId, id, params.id, e === true ? "T" : "F"));
  };

  const submitNoteText = () => {
    if (note === undefined) {
      dispatch(createNote(params.id, params.sessionId, noteText));
    } else {
      dispatch(updateNote(params.id, params.sessionId, note.id, noteText));
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <header>
            <div className="session__item-name">{single.name}</div>
            <div className="session__item-grid">
              <div>
                <div className="session__item-col">Date</div>
                <div>{moment(single.created_at).format("MMM Do YYYY")}</div>
              </div>
              <div>
                <div className="session__item-col">Time</div>
                <div>
                  {moment(single.start).format("LT")} - {moment(single.end).format("LT")}
                </div>
              </div>
              <div>
                <div className="session__item-col">Place</div>
                <div>{single.place === undefined || single.place === null || single.place.length < 1 ? "No place specified" : single.place}</div>
              </div>
            </div>
            <div>
              <div className="session__item-col">Participants</div>
              <div>
                <AssigneesBox id={params.sessionId} assignees={participants} type="session" />
              </div>
            </div>
          </header>
          <Divider />
          <div className="session__talking-point">
            <span className="session__section-title" style={{ marginBottom: "10px" }}>
              Talking Points
            </span>
            <ul className="session_talking-list">
              {talking_points.map((item: any, index: number) => (
                <li key={index}>
                  <Checkbox onChange={(e) => pointCheckHandle(e.target.checked, item.id)} checked={item.checked === "T" ? true : false}>
                    {item.checked === "T" ? <i style={{ textDecoration: "line-through" }}>{item.text}</i> : item.text}
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
            <span className="session__section-title">Notepad</span>
            <TextArea style={{ padding: "5px 0" }} value={noteText} onChange={(e) => setNoteText(e.target.value)} onBlur={submitNoteText} placeholder="Write down everything you want" bordered={false} autoSize={{ minRows: 3, maxRows: 5 }} />
          </div>
        </>
      )}
    </div>
  );
};

export default SessionItem;
