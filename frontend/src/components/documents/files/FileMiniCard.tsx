import React, { FC, useState } from "react";
import FileTypeIcon from "../../utils/FileTypeIcon";
import moment from "moment";
import { Button } from "antd";
import { DownloadOutlined, DeleteOutlined, DisconnectOutlined } from "@ant-design/icons";
import fileDownload from "js-file-download";
import axios from "axios";
import { useParams } from "react-router-dom";
import { deleteFile, ejectFile } from "../../../actions/file";
import { useDispatch } from "react-redux";
import { stringOrDate } from "react-big-calendar";

interface Props {
  data: any;
  task_id: string;
}

const FileMiniCard: FC<Props> = ({ data, task_id }) => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const download = () => {
    axios({
      url: `http://localhost:9000/api/${params.id}/files/${data.id}/download`,
      method: "GET",
      responseType: "blob" // important
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, `${data.title}.${data.file_mimetype}`);
    });
  };

  const deleteFileHandler = () => {
    console.log(data.id);
    console.log(params.id);
    dispatch(deleteFile({ project_id: params.id, id: data.id }));
  };

  const ejectFileHandler = () => {
    dispatch(ejectFile({ project_id: params.id, id: data.id, task_id: task_id }));
  };

  return (
    <div className="task__attachment-item" onMouseOver={() => setIsSettingsVisible(true)} onMouseLeave={() => setIsSettingsVisible(false)} style={{ position: "relative", zIndex: 600 }}>
      <div>
        <FileTypeIcon type={data.file_mimetype} size="65" />
      </div>
      {isSettingsVisible === false ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "12px", fontWeight: "bolder", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.title}</div>
          <span style={{ fontSize: "12px" }}>{moment(data.created_at).calendar()}</span>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          <Button onClick={() => download()} style={{ border: "none", color: "#3498db" }} icon={<DownloadOutlined style={{ fontSize: "20px" }} />}></Button>
          <Button onClick={ejectFileHandler} style={{ border: "none", color: "#f1c40f" }} icon={<DisconnectOutlined style={{ fontSize: "20px" }} />}></Button>
          <Button onClick={deleteFileHandler} style={{ border: "none", color: "crimson" }} icon={<DeleteOutlined style={{ fontSize: "20px" }} />}></Button>
        </div>
      )}
    </div>
  );
};

export default FileMiniCard;
