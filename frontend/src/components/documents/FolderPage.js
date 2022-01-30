import React, { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { getFolder } from "../../actions/folder";
import { getProjectTasks } from "../../actions/task";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileCard from "./FileCard";

const FolderPage = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const folder = useSelector((state) => state.folder.folder);
  const params = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getFolder({ id: params.folderId }));
    dispatch(getProjectTasks({ id: params.id }));
  }, []);

  console.log(folder);

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
      <div className="file__list">
        {files
          .filter((item) => item.folders_id === params.folderId)
          .map((i) => (
            <FileCard file={i} />
          ))}
      </div>
    </div>
  );
};

export default FolderPage;
