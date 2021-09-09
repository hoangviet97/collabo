import React, { useEffect, useState } from "react";
import FolderCard from "./FolderCard";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FolderList = ({ files, folders, showModal, match }) => {
  const [filteredFiles, setfilteredFiles] = useState([]);
  useEffect(() => {
    const newArr = folders.map((item) => Object.assign(item, { sum: 0 }));
    const newFiles = files.filter((item) => item.folders_id !== null);

    for (let { folders_id } of newFiles) {
      newArr.find((x) => x.id === folders_id)["sum"] += 1;
    }

    setfilteredFiles(newArr);
  }, [files]);

  return (
    <div class="files__folders-container">
      <div class="files__folders-header">
        <span style={{ fontSize: "27px", fontWeight: "bold" }}>Folders</span>
        {folders.length > 0 ? (
          <div class="files__folders-options">
            {folders.length > 4 ? <a>View all</a> : ""}
            <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("folder")}>
              <PlusCircleOutlined />
              Add folder
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div class="files__folders-list">
        {filteredFiles.length > 0 ? (
          filteredFiles.slice(0, 4).map((item, index) => {
            return <FolderCard key={index} folder={item} match={match} />;
          })
        ) : (
          <div className="folder-card folder-card--empty" onClick={() => showModal("folder")}>
            <PlusCircleOutlined style={{ fontSize: "40px", color: "#bdc3c7" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderList;
