import React, { useState, useEffect, FC } from "react";
import { Checkbox, Avatar, Tooltip } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { useSelector, RootStateOrAny } from "react-redux";

interface Props {
  data: any;
  voteCount: any;
  votes: any;
  setVoteHandler: any;
  deleteVotehandler: any;
}

const Option: FC<Props> = ({ data, voteCount, votes, setVoteHandler, deleteVotehandler }) => {
  const [isChecked, setIsChecked] = useState<boolean>();
  const [voteLength, setVoteLength] = useState<number>(0);
  const profile = useSelector((state: RootStateOrAny) => state.auth.user.email);

  useEffect(() => {
    const pom = votes.find((x: any) => x.email === profile);
    const res: any | undefined = pom === undefined ? false : true;
    setIsChecked(res);
  }, [votes]);

  const checkboxHandler = (e: any) => {
    if (e.target.checked) {
      setVoteHandler(data.id);
      setIsChecked((prev) => !prev);
      console.log(voteCount);
    } else {
      setIsChecked((prev) => !prev);
      deleteVotehandler(data.id);
      console.log(voteCount);
    }
  };

  return (
    <div className="option" style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "7px" }}>
      <div className="option__content" style={{ border: "1px solid #dfe4ea", padding: "15px", borderRadius: "8px", width: "80%", marginRight: "12px", backgroundColor: isChecked ? "#74b9ff" : "white" }}>
        <div style={{ marginBottom: "5px" }}>
          <div style={{ color: "#57606f", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Checkbox checked={isChecked} onChange={(e) => checkboxHandler(e)} />
              <span style={{ marginLeft: "10px", color: isChecked ? "white" : "black" }}>{data.text}</span>
            </div>
            <Avatar.Group>
              {votes.map((item: any, index: number) => (
                <Avatar key={index}>
                  <AvatarIcon name={item.firstname} />
                </Avatar>
              ))}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
