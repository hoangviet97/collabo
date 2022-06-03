import React, { useState, FC } from "react";
import prettyBytes from "pretty-bytes";

interface Props {
  sum: any;
}

const SemiDonut: FC<Props> = ({ sum }) => {
  return (
    <div className="sc-gauge">
      <div className="sc-background">
        <div className="sc-percentage" style={{ transform: `rotate(${(((sum / 20971520) * 100) / 100) * 180}deg)`, backgroundColor: (sum / 20971520) * 100 > 60 ? "#feca57" : "#54a0ff" }}></div>
        <div className="sc-mask"></div>
        <span className="sc-value">{prettyBytes(sum)}</span>
      </div>
      <span className="sc-min">0MB</span>
      <span className="sc-max">20MB</span>
    </div>
  );
};

export default SemiDonut;
