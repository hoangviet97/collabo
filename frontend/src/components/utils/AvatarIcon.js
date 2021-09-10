import React from "react";

const AvatarIcon = ({ name }) => {
  return (
    <>
      <span style={{ fontSize: "20px" }}>{name && name[0]}</span>
    </>
  );
};

export default AvatarIcon;
