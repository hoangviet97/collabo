import React, { useEffect, useState, FC } from "react";
import FolderCard from "./FolderCard";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FolderList = ({ files, folders, showModal, match }) => {
  const [filteredFiles, setfilteredFiles] = useState([]);
  const [maxVisibleFolders, setMaxVisibleFolders] = useState(5);
  const [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    const newArr = folders.map((item) => Object.assign(item, { sum: 0 }));
    const newFiles = files.filter((item) => item.folders_id !== null);
    console.log(newFiles);

    if (newFiles.length > 0) {
      for (let { folders_id } of newFiles) {
        newArr.find((x) => x.id === folders_id)["sum"] += 1;
      }
    }

    setfilteredFiles(newArr);
  }, [files]);

  const viewAllFoldersHandle = () => {
    setMaxVisibleFolders(folders.length);
    setShowFolders(true);
  };

  const hideAllFoldersHandle = () => {
    setMaxVisibleFolders(5);
    setShowFolders(false);
  };

  return (
    <div className="files__folders-container">
      <div className="files__folders-header">
        <span style={{ fontSize: "27px", fontWeight: "bold" }}>Folders</span>
        {folders.length > 0 ? (
          <div className="files__folders-options">
            {!showFolders ? <a onClick={viewAllFoldersHandle}>View all</a> : <a onClick={hideAllFoldersHandle}>Hide</a>}
            <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("folder")}>
              <PlusCircleOutlined />
              Add folder
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="files__folders-list">
        {filteredFiles.length > 0 ? (
          filteredFiles.slice(0, maxVisibleFolders).map((item, index) => {
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
