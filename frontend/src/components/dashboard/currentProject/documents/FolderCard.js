import React from "react";

const FolderCard = () => {
  return (
    <div className="folder-card" style={{ backgroundColor: "#ffff", width: "calc(100% / 4)", height: "120px", borderRadius: "12px", padding: "15px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
      <span>Folder Name</span>
      <h3>12 items</h3>
    </div>
  );
};

export default FolderCard;
