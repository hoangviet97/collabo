import React, { useState } from "react";
import Option from "./Option";
import { setPoolVote, deletePoolVote } from "../../actions/message";
import { useDispatch, useSelector } from "react-redux";

const Poll = ({ pollData, project }) => {
  const dispatch = useDispatch();
  const [voteC, setVoteC] = useState([]);
  const profile = useSelector((state) => state.auth.user);
  const votes = useSelector((state) => state.message.votes);
  const voteCount = votes;

  const setVoteHandler = (option) => {
    dispatch(setPoolVote({ project: project, firstname: profile.firstname, lastname: profile.lastname, email: profile.email, poll: pollData.id, option_id: option }));
  };

  const deleteVoteHandler = (option) => {
    dispatch(deletePoolVote({ project: project, email: profile.email, option_id: option }));
  };

  return (
    <div className="poll" style={{ display: "flex", flexDirection: "column", borderRadius: "12px", width: "70%", padding: "30px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
      <h3>{pollData.question}</h3>
      <div style={{ marginTop: "10px" }}>
        {pollData.optionArray.map((item, index) => {
          let filteredVotes = votes.filter((i) => i.option_id === item.id);
          return <Option key={index} data={item} voteCount={voteCount} votes={filteredVotes} setVoteHandler={setVoteHandler} deleteVotehandler={deleteVoteHandler} />;
        })}
      </div>
    </div>
  );
};

export default Poll;
