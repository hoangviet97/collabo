import React from "react";

const Container = (props) => {
  const style = {
    padding: props.size + "px"
  };
  return (
    <div className="container" style={style}>
      {props.children}
    </div>
  );
};

export default Container;
