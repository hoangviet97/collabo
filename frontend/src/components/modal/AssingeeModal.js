import React, { useState } from "react";
import { Row, Col, Input, Avatar, Button, Divider } from "antd";
import { CloseCircleOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";

const AssingeeModal = ({ members, assigneeSelected, close }) => {
  const [toggled, setToggle] = useState({});

  const toogleHandler = (index) => {
    setToggle({ ...toggled, [index]: !toggled[index] });
  };

  return (
    <>
      <div className="assignee-modal">
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
          {members.map((member, index) => (
            <div className="assignee-modal__item" key={index}>
              <div class="assignee-modal__identity">
                <Avatar /> <span>{member.firstname}</span>
              </div>
              <a onClick={(() => assigneeSelected(member.id), (e) => toogleHandler(index))}>
                {toggled[index] && <PlusOutlined style={{ fontSize: "18px" }} />}
                {!toggled[index] && <CheckCircleOutlined style={{ fontSize: "18px", color: "green" }} />}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AssingeeModal;
