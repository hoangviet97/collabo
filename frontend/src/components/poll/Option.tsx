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
    } else {
      setIsChecked((prev) => !prev);
      deleteVotehandler(data.id);
    }
  };

  return (
    <div className="option">
      <div className="option__wrap" style={{ backgroundColor: isChecked ? "#74b9ff" : "white" }}>
        <div style={{ marginBottom: "5px" }}>
          <div className="option__content">
            <div style={{ flex: 2 }}>
              <Checkbox checked={isChecked} onChange={(e) => checkboxHandler(e)} />
              <span style={{ marginLeft: "10px", color: isChecked ? "white" : "black" }}>{data.text}</span>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <Avatar.Group>
                {votes.map((item: any, index: number) => (
                  <Avatar size="large" key={index}>
                    <AvatarIcon firstname={item.firstname} lastname={item.lastname} />
                  </Avatar>
                ))}
              </Avatar.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
