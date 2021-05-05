import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from "../../../utils/Container";

const Board = () => {
  return (
    <div className="board">
      <Container size="30">
        <h2>Board</h2>
      </Container>
    </div>
  );
};

export default Board;
