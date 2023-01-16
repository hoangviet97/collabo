import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button, Skeleton } from "antd";
import { getFolder } from "../../../redux/actions/folder";
import { getFilesByFolder } from "../../../redux/actions/file";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileCard from "../files/FileCard";
import { file } from "../../../types/types";
import { AppDispatch } from "../../../redux/store";

const FolderDetail: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const files = useSelector((state: RootStateOrAny) => state.file.folder_files);
  const isLoading = useSelector((state: RootStateOrAny) => state.file.loading);
  const folder = useSelector((state: RootStateOrAny) => state.folder.folder);
  const params = useParams<{ id: string; folderId: string }>();

  useEffect(() => {
    dispatch(getFilesByFolder(params.folderId, params.id));
    dispatch(getFolder(params.folderId, params.id));
  }, []);

  return (
    <div>
      <div className="folder__header">
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
            .map((i: file, index: number) => (
              <FileCard key={index} file={i} />
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderDetail;
