import React, { useState, FC } from "react";
import Option from "./Option";
import { setPoolVote, deletePoolVote } from "../../actions/message";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

interface Props {
  pollData: any;
  id: string;
  project: any;
}

const Poll: FC<Props> = ({ pollData, id, project }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user);
  const votes = useSelector((state: RootStateOrAny) => state.message.votes);
  const voteCount = votes;

  const setVoteHandler = (option: any) => {
    dispatch(setPoolVote({ project_id: project, message_id: id, firstname: profile.firstname, lastname: profile.lastname, email: profile.email, poll_id: pollData.id, option_id: option }));
  };

  const deleteVoteHandler = (option: any) => {
    dispatch(deletePoolVote({ project_id: project, message_id: id, email: profile.email, poll_id: pollData.id, option_id: option }));
  };

  return (
    <div className="poll" style={{ display: "flex", flexDirection: "column", borderRadius: "12px", width: "70%", padding: "30px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
      <h3>{pollData.question}</h3>
      <div style={{ marginTop: "10px" }}>
        {pollData.optionArray.map((item: any, index: number) => {
          let filteredVotes = votes.filter((i: any) => i.option_id === item.id);
          return <Option key={index} data={item} voteCount={voteCount} votes={filteredVotes} setVoteHandler={setVoteHandler} deleteVotehandler={deleteVoteHandler} />;
        })}
      </div>
    </div>
  );
};

export default Poll;
