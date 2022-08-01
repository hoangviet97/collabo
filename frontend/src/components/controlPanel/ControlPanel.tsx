import React, { useEffect, FC } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getMembers } from "../../actions/member";
import { member } from "../../types/types";
import AvatarIcon from "../utils/AvatarIcon";
import { Avatar, Input, Badge } from "antd";

interface Props {
  match: any;
}

const ControlPanel: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const members = useSelector((state: RootStateOrAny) => state.member.members);

  useEffect(() => {
    dispatch(getMembers({ project_id: params.id }));
  }, []);

  return (
    <div className="review__panel">
      <Input placeholder="Search members by name or e-mail" />
      <div style={{ marginTop: "30px" }}>
        {members.map((member: member) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <Avatar>
                <AvatarIcon firstname={member.firstname} lastname={member.lastname} />
              </Avatar>
              <div style={{ marginLeft: "10px" }}>
                <Link to={`${match.url}/${member.id}`}>
                  {member.firstname} {member.lastname}
                </Link>
              </div>
            </div>
            <Badge count={2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
