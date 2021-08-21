import React from "react";
import { Button, Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const FolderCard = ({ folder }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a>Rename</a>
      </Menu.Item>
      <Menu.Item>
        <a>Delete</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="folder-card">
      <div className="folder-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{folder.title}</span>
        <Dropdown overlay={menu}>
          <Button type="text" style={{ padding: 0 }}>
            <EllipsisOutlined style={{ color: "white", fontSize: "20px" }} />
          </Button>
        </Dropdown>
      </div>
      <span>12 items</span>
    </div>
  );
};

export default FolderCard;
