import React, { FC, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import color from "../../styles/abstract/variables.module.scss";
import { Avatar, Popover } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import AssigneesModal from "../modal/AssigneesModal";
import AvatarIcon from "../utils/AvatarIcon";

interface Props {
  id: string;
  assignees: any;
  type: string;
}

const AssigneesBox: FC<Props> = ({ assignees, id, type }) => {
  const [assignessModalVisible, setAssignessModalVisible] = useState<boolean>(false);

  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const members = useSelector((state: RootStateOrAny) => state.member.members);

  const closeAssigness = () => {
    setAssignessModalVisible(false);
  };

  const showAssigness = () => {
    setAssignessModalVisible(true);
  };

  return (
    <div>
      {assignees.length > 0 ? (
        <>
          <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {assignees.map((assignee: any, index: number) => (
              <Popover key={index} content={`${assignee.firstname} ${assignee.lastname} (${assignee.email})`}>
                <Avatar key={index} style={{ backgroundColor: assignee.color === null || assignee.color.length < 1 ? color.normal_orange : assignee.color }}>
                  <AvatarIcon firstname={assignee.firstname} lastname={assignee.lastname} />
                </Avatar>
              </Popover>
            ))}
          </Avatar.Group>
          {user_role !== "Member" && (
            <div onClick={showAssigness} style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-23px", borderRadius: "50%", marginLeft: assignees.length < 2 ? "32px" : "55px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
            </div>
          )}
        </>
      ) : (
        <div onClick={showAssigness} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
        </div>
      )}
      {assignessModalVisible && <AssigneesModal item_id={id} assignees={assignees} members={members} close={closeAssigness} type={type} />}
    </div>
  );
};

export default AssigneesBox;
