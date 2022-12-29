import React, { useEffect, useState, FC } from "react";
import FolderCard from "./FolderCard";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector, RootStateOrAny } from "react-redux";
import CardSkeleton from "../../skeletons/CardSkeleton";

interface Props {
  showModal: (modalType: string) => void;
}

const FolderList: FC<Props> = ({ showModal }) => {
  const [maxVisibleFolders, setMaxVisibleFolders] = useState<number>(4);
  const [showFolders, setShowFolders] = useState<boolean>(false);
  const folders = useSelector((state: RootStateOrAny) => state.folder.folders);
  const isLoading = useSelector((state: RootStateOrAny) => state.folder.loading);

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
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <div className="files__folder-list-component">
            {folders.length > 0 ? (
              folders.slice(0, maxVisibleFolders).map((item: any, index: number) => {
                return <FolderCard key={index} folder={item} />;
              })
            ) : (
              <div className="folder-card folder-card--empty" onClick={() => showModal("folder")}>
                <PlusCircleOutlined style={{ fontSize: "40px", color: "#bdc3c7" }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderList;
