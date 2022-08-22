import React, { FC } from "react";
import Option from "./Option";
import { setPoolVote, deletePoolVote } from "../../actions/message";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { option } from "../../types/types";

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

  const setVoteHandler = (option: string) => {
    dispatch(setPoolVote(params.id, id, profile.firstname, profile.lastname, profile.email, profile.color, pollData.id, option));
  };

  const deleteVoteHandler = (option: string) => {
    dispatch(deletePoolVote(params.id, id, profile.email, pollData.id, option));
  };

  return (
    <div className="poll">
      <h3>{pollData.question}</h3>
      <div style={{ marginTop: "10px" }}>
        {pollData.optionArray.map((item: option, index: number) => {
          let filteredVotes = votes.filter((i: any) => i.option_id === item.id);
          return <Option key={index} data={item} voteCount={voteCount} votes={filteredVotes} setVoteHandler={setVoteHandler} deleteVotehandler={deleteVoteHandler} />;
        })}
      </div>
    </div>
  );
};

export default Poll;
