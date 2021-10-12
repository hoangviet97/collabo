import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import FileTypeIcon from "../utils/FileTypeIcon";

const SidePanel = ({ file }) => {
  const detailBody = () => (
    <div>
      <FileTypeIcon type={file.file_mimetype} size="180" />
      <h3>{file.title}</h3>
    </div>
  );

  const emptyBody = () => (
    <div style={{ backgroundColor: "#ecf0f1", width: "100%", height: "100%", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <span>
        <InfoCircleOutlined /> &nbsp; Select the file to view details
      </span>
    </div>
  );

  return (
    <div className="files__storage-tab" style={{ display: "flex", justifyContent: "center" }}>
      {Object.keys(file).length !== 0 ? detailBody() : emptyBody()}
    </div>
  );
};

export default SidePanel;
