import React, { FC } from "react";
import { Button } from "antd";
import { InfoCircleOutlined, StarFilled, DownloadOutlined } from "@ant-design/icons";
import download from "downloadjs";
import axios from "axios";
import FileTypeIcon from "../../utils/FileTypeIcon";
import { getFileDetail } from "../../../actions/file";
import { useDispatch } from "react-redux";

interface Props {
  file: any;
}

const FileCard: FC<Props> = ({ file }) => {
  const dispatch = useDispatch();
  const favoriteToggle = () => {};

  const showDetail = () => {
    dispatch(getFileDetail({ file: file }));
  };

  const downloadFile = async (id: string, path: string, mimetype: any) => {
    try {
      const result = await axios.post(`http://localhost:9000/api/files/download/${id}`, {
        responseType: "blob"
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, mimetype);
    } catch (error) {}
  };

  return (
    <div className="file-card" style={{ backgroundColor: "white" }}>
      <div className="file-card__header" style={{ display: "flex", justifyContent: "space-between" }}>
        <StarFilled onClick={favoriteToggle} className="file-card__favorite" />
        <div style={{ padding: 0, cursor: "pointer" }} onClick={showDetail}>
          <InfoCircleOutlined style={{ fontSize: "20px" }} />
        </div>
      </div>
      <div className="file-card__body" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FileTypeIcon type={file.file_mimetype} />
        </div>
        <h3>{file.title}</h3>
      </div>
      <div className="file-card__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="file-card__filesize" style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span>Filesize:</span>
          <span>{file.size} Kb</span>
        </div>
        <div className="file-card__download">
          <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadFile(file.id, file.file_path, file.file_mimetype)} />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
