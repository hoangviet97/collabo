import React from "react";
import { Button } from "antd";
import { EllipsisOutlined, StarFilled, DownloadOutlined } from "@ant-design/icons";
import download from "downloadjs";
import axios from "axios";
import FileTypeIcon from "../utils/FileTypeIcon";

const FileCard = ({ file }) => {
  const favoriteToggle = () => {};

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.post(`http://localhost:9000/api/files/download/${id}`, {
        responseType: "blob"
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div className="file-card" style={{ backgroundColor: "white" }}>
      <div class="file-card__header">
        <StarFilled onClick={favoriteToggle} className="file-card__favorite" />
        <Button type="text" style={{ padding: 0 }}>
          <EllipsisOutlined style={{ color: "white", fontSize: "20px" }} />
        </Button>
      </div>
      <div class="file-card__body" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FileTypeIcon type={file.file_mimetype} />
        </div>
        <h3>{file.title}</h3>
      </div>
      <div class="file-card__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div class="file-card__filesize" style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span>Filesize:</span>
          <span>{file.size}</span>
        </div>
        <div className="file-card__download">
          <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadFile(file.id, file.file_path, file.file_mimetype)} />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
