import React, { useState } from "react";
import { Row, Col, Input, Avatar, Button, Divider } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { CloseCircleOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";

const AssigneesModal = ({ assignees, members, assigneeSelected, assigneeDelete, close }) => {
  const [toggled, setToggle] = useState({});

  const toogleHandler = (index) => {
    setToggle({ ...toggled, [index]: !toggled[index] });
  };

  const isAssigneed = (email) => {
    const searcher = assignees.filter((i) => i.email === email);

    if (searcher.length > 0) {
      return (
        <a>
          <CheckCircleOutlined />
        </a>
      );
    } else {
      return (
        <a>
          <PlusOutlined />
        </a>
      );
    }
  };

  return (
    <>
      <div className="assignee-modal" style={{ borderRadius: "10px" }}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span="18">
            <Input size="small" />
          </Col>
          <Col span="6" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <a onClick={close}>
              <CloseCircleOutlined style={{ color: "crimson", fontSize: "18px" }} />
            </a>
          </Col>
        </Row>
        <div class="assignee-modal__members">
          {members.map((item, index) => (
            <div className="assignee-modal__item" key={index}>
              <div class="assignee-modal__identity">
                <Avatar>
                  <AvatarIcon name={item.firstname} />
                </Avatar>{" "}
                <span>{item.lastname}</span>
              </div>
              {isAssigneed(item.email)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AssigneesModal;
