import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { createAssignee, deleteAssignee } from "../../actions/task";
import { Row, Col, Input, Avatar, Button, Divider } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { CloseCircleOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { member } from "../../types/types";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  task_id: string;
  assignees: any;
  members: member[];
  close: any;
}

const AssigneesModal: FC<Props> = ({ task_id, assignees, members, close }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [searchText, setSearchText] = useState<string>("");

  const searchTextHandle = (e: any) => {
    setSearchText(e.target.value);
  };

  const addNewAssignee = (id: string) => {
    dispatch(createAssignee({ user_id: id, task_id: task_id, project_id: params.id }));
  };

  const removeAssignee = (id: string, email: string) => {
    dispatch(deleteAssignee({ user_id: id, task_id: task_id, project_id: params.id }));
  };

  const isAssigneed = (email: string, id: string) => {
    const searcher = assignees.filter((i: any) => i.email === email);

    if (searcher.length > 0) {
      return (
        <a onClick={() => removeAssignee(id, email)}>
          <CheckCircleOutlined />
        </a>
      );
    } else {
      return (
        <a onClick={() => addNewAssignee(id)}>
          <PlusOutlined />
        </a>
      );
    }
  };

  return (
    <>
      <div className="assignee-modal" style={{ borderRadius: "10px", zIndex: 99999 }}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span="18">
            <Input size="small" onChange={(e) => searchTextHandle(e)} />
          </Col>
          <Col span="6" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <a onClick={close}>
              <CloseCircleOutlined style={{ color: "crimson", fontSize: "18px" }} />
            </a>
          </Col>
        </Row>
        <div className="assignee-modal__members">
          {members
            .filter((i: any) => {
              return i.firstname.toLowerCase().includes(searchText.toLowerCase()) || i.lastname.toLowerCase().includes(searchText.toLowerCase()) || i.email.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((item: any, index: number) => (
              <div className="assignee-modal__item" key={index}>
                <div className="assignee-modal__identity">
                  <Avatar style={{ backgroundColor: item.color === null || item.color.length < 1 ? color.normal_orange : item.color }}>
                    <AvatarIcon firstname={item.firstname} lastname={item.lastname} />
                  </Avatar>{" "}
                  <span>{item.lastname}</span>
                </div>
                {isAssigneed(item.email, item.user_id)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AssigneesModal;
