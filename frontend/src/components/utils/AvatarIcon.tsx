import React, { FC } from "react";

interface Props {
  firstname: string;
  lastname?: string;
  size?: number;
}

const AvatarIcon: FC<Props> = ({ firstname, lastname, size }) => {
  return (
    <>
      <div style={{ fontSize: size ? `${size}px` : "18px" }}>
        <span>{firstname[0]}</span>
        <span style={{ textTransform: "uppercase" }}>{lastname && lastname[0]}</span>
      </div>
    </>
  );
};

export default AvatarIcon;
