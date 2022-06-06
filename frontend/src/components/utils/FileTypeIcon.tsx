import React, { FC } from "react";
import Docx from "../../img/icons/formats/Docx";
import Pdf from "../../img/icons/formats/Pdf";
import Jpeg from "../../img/icons/formats/Jpeg";
import Xlsx from "../../img/icons/formats/Xlsx";
import Other from "../../img/icons/formats/Other";

interface Props {
  type: string;
  size?: string;
}

const FileTypeIcon: FC<Props> = ({ type, size }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <Pdf className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
      case "docx":
        return <Docx className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
      case "jpeg":
        return <Jpeg className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
      case "jpg":
        return <Jpeg className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
      case "xlsx":
        return <Xlsx className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
      default:
        return <Other className="file__icon" style={{ width: size ? `${size}px` : "100px" }} />;
    }
  };

  return <div>{getTypeIcon(type)}</div>;
};

export default FileTypeIcon;
