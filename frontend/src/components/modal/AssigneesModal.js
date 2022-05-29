import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAssignee, deleteAssignee } from "../../actions/task";
import { Row, Col, Input, Avatar, Button, Divider } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { CloseCircleOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";

const AssigneesModal = ({ task_id, assignees, members, close, project }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const searchTextHandle = (e) => {
    setSearchText(e.target.value);
  };

  const addNewAssignee = (id) => {
    dispatch(createAssignee({ user_id: id, task_id: task_id, project: project }));
  };

  const removeAssignee = (id, email) => {
    dispatch(deleteAssignee({ user_id: id, task_id: task_id, email: email, project: project }));
  };

  const isAssigneed = (email, id) => {
    const searcher = assignees.filter((i) => i.email === email);

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
      <div className="assignee-modal" style={{ borderRadius: "10px", zIndex: "99999" }}>
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
        <div class="assignee-modal__members">
          {members
            .filter((i) => {
              return i.firstname.toLowerCase().includes(searchText.toLowerCase()) || i.lastname.toLowerCase().includes(searchText.toLowerCase()) || i.email.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((item, index) => (
              <div className="assignee-modal__item" key={index}>
                <div class="assignee-modal__identity">
                  <Avatar>
                    <AvatarIcon name={item.firstname} />
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
