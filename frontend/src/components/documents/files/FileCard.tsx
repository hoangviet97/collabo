import React, { FC } from "react";
import { Button } from "antd";
import { InfoCircleOutlined, StarFilled, DownloadOutlined } from "@ant-design/icons";
import download from "downloadjs";
import fileDownload from "js-file-download";
import axios from "axios";
import FileTypeIcon from "../../utils/FileTypeIcon";
import { getFileDetail } from "../../../actions/file";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { file } from "../../../types/types";
import prettyBytes from "pretty-bytes";

interface Props {
  file: file;
}

const FileCard: FC<Props> = ({ file }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const favoriteToggle = () => {};

  const showDetail = () => {
    dispatch(getFileDetail({ file: file }));
  };

  const download = (record: file) => {
    axios({
      url: `https://collaboatbe.herokuapp.com/api/${params.id}/files/${record.id}/download`,
      method: "GET",
      responseType: "blob" // important
    }).then((response) => {
      fileDownload(response.data, `${record.title}.${record.file_mimetype}`);
    });
  };

  return (
    <div className="file-card">
      <div className="file-card__header">
        <StarFilled onClick={favoriteToggle} className="file-card__favorite" />
        <div style={{ padding: 0, cursor: "pointer" }} onClick={showDetail}>
          <InfoCircleOutlined style={{ fontSize: "20px" }} />
        </div>
      </div>
      <div className="file-card__body">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FileTypeIcon type={file.file_mimetype} />
        </div>
        <h3>{file.title}</h3>
      </div>
      <div className="file-card__footer">
        <div className="file-card__filesize">
          <span>Filesize:</span>
          <span>{prettyBytes(file.size)}</span>
        </div>
        <div className="file-card__download">
          <Button type="primary" icon={<DownloadOutlined />} onClick={() => download(file)} />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
