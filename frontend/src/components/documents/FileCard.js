import React from "react";
import { Button } from "antd";
import { EllipsisOutlined, StarFilled } from "@ant-design/icons";

const FileCard = ({ file }) => {
  const favoriteToggle = () => {};

  return (
    <div className="file-card" style={{ backgroundColor: "white" }}>
      <div class="file-card__header">
        <StarFilled onClick={favoriteToggle} className="file-card__favorite" />
        <Button type="text" style={{ padding: 0 }}>
          <EllipsisOutlined style={{ color: "white", fontSize: "20px" }} />
        </Button>
      </div>
      <div class="file-card__body">
        <h3>{file.title}</h3>
      </div>
      <div class="file-card__footer">
        <div class="file-card__filesize">
          <span>Filesize</span>
          <span>23MB</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
