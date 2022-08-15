import React, { FC } from "react";
import { Button, Menu, Dropdown } from "antd";
import { EllipsisOutlined, FolderFilled } from "@ant-design/icons";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { deleteFolder } from "../../../actions/folder";
import { useDispatch } from "react-redux";

interface Props {
  folder: any;
}

const FolderCard: FC<Props> = ({ folder }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();
  const location: any = useLocation();

  const deleteFolderHandler = () => {
    dispatch(deleteFolder(params.id, folder.id));
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a>Rename</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={deleteFolderHandler}>Delete</a>
      </Menu.Item>
    </Menu>
  );

  const redirectHandle = () => {
    history.push(location.pathname + "/folders/" + folder.id);
  };

  return (
    <div className="folder-card">
      <div className="folder-card__header">
        <div>
          <FolderFilled className="folder-card__icon" />
        </div>
        <div>
          <Dropdown overlay={menu}>
            <Button type="text" style={{ padding: 0 }}>
              <EllipsisOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="folder-card__text" onClick={redirectHandle}>
        <a className="folder-card__title">{folder.title}</a>
        <span className="folder-card__count">{folder.total_files > 0 ? folder.total_files : "no"} files</span>
      </div>
    </div>
  );
};

export default FolderCard;
