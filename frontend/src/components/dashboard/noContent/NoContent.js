import React from "react";
import { Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { showNewProjectForm } from "../../../actions/newProject";

const NoContent = ({ type, showNewProjectForm }) => {
  const createNewContent = () => {};
  return (
    <div className="no-content">
      <InboxOutlined style={{ fontSize: "50px", color: "grey" }} />
      <h2>There're no {type}s for you</h2>
      <Button type="primary" onClick={createNewContent}>
        Create your first {type}
      </Button>
    </div>
  );
};

export default connect(null, {})(NoContent);
