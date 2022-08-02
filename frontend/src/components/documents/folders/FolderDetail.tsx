import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button, Skeleton } from "antd";
import { getFolder } from "../../../actions/folder";
import { getFilesByFolder } from "../../../actions/file";
import { getProjectTasks } from "../../../actions/task";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileCard from "../files/FileCard";
import { file } from "../../../types/types";

const FolderDetail = () => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootStateOrAny) => state.file.folder_files);
  const isLoading = useSelector((state: RootStateOrAny) => state.file.loading);
  const folder = useSelector((state: RootStateOrAny) => state.folder.folder);
  const params: any = useParams();

  useEffect(() => {
    dispatch(getFilesByFolder({ id: params.folderId, project_id: params.id }));
    dispatch(getFolder({ id: params.folderId, project_id: params.id }));
  }, []);

  return (
    <div>
      <div className="folder-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/${params.id}/documents`}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{folder.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">+</Button>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="file__list">
          {files
            .filter((item: file) => item.folders_id === params.folderId)
            .map((i: any, index: number) => (
              <FileCard key={index} file={i} />
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderDetail;
