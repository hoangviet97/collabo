import React, { FC } from "react";

interface Props {
  name: string;
}

const AvatarIcon: FC<Props> = ({ name }) => {
  return (
    <>
      <span style={{ fontSize: "20px" }}>{name && name[0]}</span>
    </>
  );
};

export default AvatarIcon;
