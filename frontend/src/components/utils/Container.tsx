import React, { FC } from "react";

interface Props {
  size: string;
}

const Container: FC<Props> = ({ size, children }) => {
  const style = {
    padding: size + "px"
  };
  return (
    <div className="container" style={style}>
      {children}
    </div>
  );
};

export default Container;
