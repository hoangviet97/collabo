import React, { FC } from "react";

interface Props {
  size: any;
  children: any;
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
