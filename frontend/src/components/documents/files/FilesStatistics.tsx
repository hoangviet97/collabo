import React from "react";
import prettyBytes from "pretty-bytes";
import FileTypeIcon from "../../utils/FileTypeIcon";
import SemiDonut from "../../utils/SemiDonut";
import { useSelector, RootStateOrAny } from "react-redux";

const FilesStatistics: React.FunctionComponent = () => {
  const statistics = useSelector((state: RootStateOrAny) => state.file.statistics);
  const sum = useSelector((state: RootStateOrAny) => state.file.total);

  return (
    <div className="files__statistics">
      <div className="files__statistics-title">Storage</div>
      <div className="files__donut">
        <SemiDonut sum={sum} />
      </div>
      <div className="files__stats-list">
        {statistics.map((item: any, index: number) => (
          <div className="files__stats-item" key={index}>
            <div>
              <FileTypeIcon type={item.type} size="55" />
            </div>
            <div className="files__stats-content">
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
