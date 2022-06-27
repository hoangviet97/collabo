import React, { FC } from "react";

interface Props {
  name: string;
  size?: number;
}

const AvatarIcon: FC<Props> = ({ name, size }) => {
  return (
    <>
      <span style={{ fontSize: size ? `${size}px` : "20px" }}>{name && name[0]}</span>
    </>
  );
};

export default AvatarIcon;
