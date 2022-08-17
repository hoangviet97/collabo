import React, { FC, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getMembers } from "../../actions/member";
import { member } from "../../types/types";
import AvatarIcon from "../utils/AvatarIcon";
import { Avatar, Input } from "antd";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  match: any;
}

const ReportControlPanel: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const members = useSelector((state: RootStateOrAny) => state.member.members);

  useEffect(() => {
    dispatch(getMembers({ project_id: params.id }));
  }, []);

  return (
    <div className="report__panel">
      <h2>Reports</h2>
      <div style={{ marginTop: "30px" }}>
        {members.map((member: member, index: number) => (
          <div key={index} className="report__panel-list">
            <Avatar style={{ backgroundColor: member.color === null || member.color.length < 1 ? color.normal_orange : member.color }}>
              <AvatarIcon firstname={member.firstname} lastname={member.lastname} />
            </Avatar>
            <div style={{ marginLeft: "10px" }}>
              <Link to={`${match.url}/${member.id}`}>
                {member.firstname} {member.lastname}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportControlPanel;
