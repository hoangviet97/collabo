import React, { useEffect, useState, FC } from "react";
import FolderCard from "./FolderCard";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface Props {
  files: any;
  folders: any;
  showModal: any;
  match: any;
}

const FolderList: FC<Props> = ({ files, folders, showModal, match }) => {
  const [filteredFiles, setfilteredFiles] = useState<Array<any>>([]);
  const [maxVisibleFolders, setMaxVisibleFolders] = useState<number>(4);
  useEffect(() => {
    const newArr = folders.map((item: any) => Object.assign(item, { sum: 0 }));
    const newFiles = files.filter((item: any) => item.folders_id !== null);

    if (newFiles.length > 0) {
      for (let { folders_id } of newFiles) {
        newArr.find((x: any) => x.id === folders_id)["sum"] += 1;
      }
    }

    setfilteredFiles(newArr);
  }, [files]);

  const viewAllFoldersHandle = () => {
    setMaxVisibleFolders(folders.length);
  };

  return (
    <div className="files__folders-container">
      <div className="files__folders-header">
        <span style={{ fontSize: "27px", fontWeight: "bold" }}>Folders</span>
        {folders.length > 0 ? (
          <div className="files__folders-options">
            {folders.length > 4 ? <a onClick={viewAllFoldersHandle}>View all</a> : ""}
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
