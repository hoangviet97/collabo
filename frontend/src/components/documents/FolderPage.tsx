import React, { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { getProjectTasks } from "../../actions/task";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileCard from "./FileCard";

interface Props {
  files: any;
  folders: any;
}

const FolderPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootStateOrAny) => state.file.files);
  const folders = useSelector((state: RootStateOrAny) => state.folder.folders);
  const params: any = useParams();
  const [folder, setFolder] = useState("");

  useEffect(() => {
    dispatch(getProjectTasks({ id: params.id }));
  }, []);

  useEffect(() => {
    const filtered = folders.filter((item: RootStateOrAny) => item.id === params.folderId);
    setFolder(filtered[0].title);
  }, [files, folders]);

  return (
    <div>
      <div className="folder-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/${params.id}/documents`}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{folder}</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">Upload File</Button>
      </div>
      <div className="file__list">
        {files
          .filter((item: any) => item.folders_id === params.folderId)
          .map((i: any) => (
            <FileCard file={i} />
          ))}
      </div>
    </div>
  );
};

export default FolderPage;
