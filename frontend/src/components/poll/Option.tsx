import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { Checkbox, Avatar } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { useSelector, RootStateOrAny } from "react-redux";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  data: any;
  voteCount: any;
  votes: any;
  setVoteHandler: (option: string) => void;
  deleteVotehandler: (option: string) => void;
}

const Option: FC<Props> = ({ data, voteCount, votes, setVoteHandler, deleteVotehandler }) => {
  const [isChecked, setIsChecked] = useState<boolean>();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user.email);

  useEffect(() => {
    const pom = votes.find((x: any) => x.email === profile);
    const res: any | undefined = pom === undefined ? false : true;
    setIsChecked(res);
  }, [votes]);

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
      <div className="option__wrap" style={{ backgroundColor: isChecked ? color.light_blue : color.base_white }}>
        <div style={{ marginBottom: "5px" }}>
          <div className="option__content">
            <div style={{ flex: 2 }}>
              <Checkbox checked={isChecked} onChange={(e: any) => checkboxHandler(e)} />
              <span style={{ marginLeft: "10px", color: isChecked ? color.base_white : color.primary_text }}>{data.text}</span>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <Avatar.Group>
                {votes.map((item: any, index: number) => (
                  <Avatar size="large" key={index} style={{ backgroundColor: item.color === null || item.color.length < 1 ? color.normal_orange : item.color }}>
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
