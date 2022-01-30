import React, { FC } from "react";

const Container = ({ size, children }) => {
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
