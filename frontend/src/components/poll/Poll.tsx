import React, { useState, FC } from "react";
import Option from "./Option";
import { setPoolVote, deletePoolVote } from "../../actions/message";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  pollData: any;
  id: string;
}

const Poll: FC<Props> = ({ pollData, id }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user);
  const votes = useSelector((state: RootStateOrAny) => state.message.votes);
  const voteCount = votes;

  const setVoteHandler = (option: any) => {
    dispatch(setPoolVote({ project_id: params.id, message_id: id, firstname: profile.firstname, lastname: profile.lastname, email: profile.email, color: profile.color, poll_id: pollData.id, option_id: option }));
  };

  const deleteVoteHandler = (option: any) => {
    dispatch(deletePoolVote({ project_id: params.id, message_id: id, email: profile.email, poll_id: pollData.id, option_id: option }));
  };

  return (
    <div className="poll">
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
