import React, { FC, useState } from "react";
import FileTypeIcon from "../../utils/FileTypeIcon";
import moment from "moment";
import { Button, Tooltip } from "antd";
import { DownloadOutlined, DeleteOutlined, DisconnectOutlined } from "@ant-design/icons";
import fileDownload from "js-file-download";
import { useParams } from "react-router-dom";
import { deleteFile, ejectFile } from "../../../redux/actions/file";
import { useDispatch } from "react-redux";
import axiosClient from "../../../helpers/axios";
import { AppDispatch } from "../../../redux/store";

interface Props {
  data: any;
  task_id: string;
  deleteProp: boolean;
  bordered: boolean;
}

const FileMiniCard: FC<Props> = ({ data, task_id, deleteProp, bordered }) => {
  const params: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const download = () => {
    axiosClient({
      url: `https://collaboatbe.herokuapp.com/api/${params.id}/files/${data.id}/download`,
      method: "GET",
      responseType: "blob"
    }).then((response) => {
      fileDownload(response.data, `${data.title}.${data.file_mimetype}`);
    });
  };

  const deleteFileHandler = () => {
    dispatch(deleteFile(params.id, data.id));
  };

  const ejectFileHandler = () => {
    dispatch(ejectFile(params.id, data.id, task_id));
  };

  return (
    <div className="task__attachment-item" onMouseOver={() => setIsSettingsVisible(true)} onMouseLeave={() => setIsSettingsVisible(false)} style={{ position: "relative", zIndex: 600, border: bordered ? `0.2px solid #bdc3c7` : "none" }}>
      <div>
        <FileTypeIcon type={data.file_mimetype} size="65" />
      </div>
      {isSettingsVisible === false ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "12px", fontWeight: "bolder", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.title}</div>
          <span style={{ fontSize: "12px" }}>{moment(data.created_at).calendar()}</span>
        </div>
      ) : (
        <div className="task__attachment-actions">
          <Tooltip title="Download">
            <Button className="task__attachment-btn" onClick={() => download()} style={{ color: "#3498db" }} icon={<DownloadOutlined className="task__attachment-icon" />}></Button>
          </Tooltip>
          {deleteProp && (
            <Tooltip title="Eject from the task">
              <Button className="task__attachment-btn" onClick={ejectFileHandler} style={{ color: "#f1c40f" }} icon={<DisconnectOutlined className="task__attachment-icon" />}></Button>
            </Tooltip>
          )}
          {deleteProp && (
            <Tooltip title="Delete">
              <Button className="task__attachment-btn" onClick={deleteFileHandler} style={{ color: "crimson" }} icon={<DeleteOutlined className="task__attachment-icon" />}></Button>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

export default FileMiniCard;
