import React from "react";

const Column = ({ provided, snapshot, children }) => {
  return (
    <div className="board-column" {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey" }}>
      {children}
    </div>
  );
};

export default Column;
