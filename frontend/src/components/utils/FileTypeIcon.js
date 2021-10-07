import React from "react";
import Docx from "../../img/icons/formats/Docx";
import Pdf from "../../img/icons/formats/Pdf";
import Jpeg from "../../img/icons/formats/Jpeg";
import Xlsx from "../../img/icons/formats/Xlsx";
import Other from "../../img/icons/formats/Other";

const FileTypeIcon = ({ type }) => {
  console.log(type);
  const getTypeIcon = (type) => {
    switch (type) {
      case "pdf":
        return <Pdf style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "8px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
      case "docx":
        return <Docx style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "8px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
      case "jpeg":
        return <Jpeg style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "8px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
      case "jpg":
        return <Jpeg style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "8px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
      case "xlsx":
        return <Xlsx style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "8px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
      default:
        return <Other style={{ width: "100px", backgroundColor: "#F8F8FB", padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }} />;
    }
  };

  return <div>{getTypeIcon(type)}</div>;
};

export default FileTypeIcon;
