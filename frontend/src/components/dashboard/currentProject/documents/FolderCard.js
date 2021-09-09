import React from "react";
import { Button, Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const FolderCard = ({ folder, match }) => {
  const history = useHistory();
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

  const redirectHandle = () => {
    history.push(match.url + "/folders/" + folder.id);
  };

  return (
    <div className="folder-card" onClick={redirectHandle}>
      <div className="folder-card__header">
        <span>{folder.title}</span>
        <Dropdown overlay={menu}>
          <Button type="text" style={{ padding: 0 }}>
            <EllipsisOutlined style={{ color: "white", fontSize: "20px" }} />
          </Button>
        </Dropdown>
      </div>
      <span>{folder.sum > 0 ? folder.sum : "no"} files</span>
    </div>
  );
};

export default FolderCard;
