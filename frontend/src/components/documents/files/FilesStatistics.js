import React, { FC, useState } from "react";
import prettyBytes from "pretty-bytes";
import FileTypeIcon from "../../utils/FileTypeIcon";
import SemiDonut from "../../utils/SemiDonut";
import { useSelector } from "react-redux";

const FilesStatistics = () => {
  const statistics = useSelector((state) => state.file.statistics);
  const sum = useSelector((state) => state.file.total);

  return (
    <div>
      <div style={{ fontSize: "30px", fontWeight: "bolder" }}>Storage</div>
      <div>
        <SemiDonut sum={sum} />
      </div>
      <div>
        {statistics.map((item, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "15px" }}>
            <div>
              <FileTypeIcon type={item.type} size="55" />
            </div>
            <div style={{ display: "flex", justifyContent: "justify-content", position: "relative", width: "100%", marginLeft: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bolder", fontSize: "15px" }}>{item.type}</span>
                <span style={{ fontSize: "13px" }}>{item.total} files</span>
              </div>
              <div style={{ position: "absolute", right: "10px" }}>
                <span style={{ fontWeight: "bolder" }}>{prettyBytes(parseInt(item.sum))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesStatistics;
