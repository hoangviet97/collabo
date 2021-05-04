import React, { useState } from "react";
import { Row, Col, Input, Avatar, Button } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AssingeeModal = (props) => {
  return (
    <>
      <div className="assigneeModal" style={{ padding: "7px" }}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span="18">
            <Input size="small" />
          </Col>
          <Col span="6" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <a onClick={props.close}>
              <CloseCircleOutlined />
            </a>
          </Col>
        </Row>

        {props.members.map((member, index) => (
          <div key={index}>
            <Row>
              <Col span="20" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Avatar /> <span>{member.firstname}</span>
              </Col>
              <Col span="4">
                <Button onClick={() => props.assigneeSelected(member.id)}>
                  <PlusOutlined />
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default AssingeeModal;
