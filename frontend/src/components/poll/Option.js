import React, { useState, useEffect } from "react";
import { Checkbox, Button, Avatar, Tooltip } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { useSelector } from "react-redux";

const Option = ({ data, votes, setVoteHandler, deleteVotehandler }) => {
  const [isChecked, setIsChecked] = useState();
  const profile = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    const pom = votes.find((x) => x.email === profile);
    const res = pom === undefined ? false : true;
    setIsChecked(res);
  }, [votes]);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setVoteHandler(data.id);
      setIsChecked((prev) => !prev);
    } else {
      setIsChecked((prev) => !prev);
      deleteVotehandler(data.id);
    }
  };

  return (
    <div className="option" style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "7px" }}>
      <div className="option__content" style={{ border: "1px solid #dfe4ea", padding: "15px", borderRadius: "8px", width: "80%", marginRight: "12px", backgroundColor: isChecked ? "#74b9ff" : "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <div style={{ color: "#57606f", fontWeight: "bold" }}>
            <Checkbox checked={isChecked} onChange={(e) => checkboxHandler(e)} />
            <span style={{ marginLeft: "10px", color: isChecked ? "white" : "black" }}>{data.text}</span>
          </div>
        </div>

        <div className="option__progress" style={{ backgroundColor: isChecked ? "white" : "#dfe4ea", width: "100%", height: "6px", borderRadius: "50px" }}>
          <div style={{ backgroundColor: "#1e90ff", width: "50%", height: "6px", borderRadius: "50px" }}></div>
        </div>
      </div>
      <div>
        <Avatar.Group>
          {votes.map((item, index) => (
            <Avatar key={index}>
              <AvatarIcon name={item.firstname} />
            </Avatar>
          ))}
        </Avatar.Group>
      </div>
    </div>
  );
};

export default Option;
