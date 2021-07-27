import React from "react";

const Task = ({ provided, snapshot, item }) => {
  return (
    <div
      className="board-item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
        ...provided.draggableProps.style
      }}
    >
      <span className="board-item__title">{item.name}</span>
    </div>
  );
};

export default Task;
