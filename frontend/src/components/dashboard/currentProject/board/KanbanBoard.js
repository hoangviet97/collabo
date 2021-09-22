import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import { getProjectTasks } from "../../../../actions/task";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";

const KanbanBoard = ({ match, tasks, getProjectTasks }) => {
  const board = {
    columns: [
      {
        id: 0,
        title: "Open",
        cards: []
      },
      {
        id: 1,
        title: "In Progress",
        cards: []
      },
      {
        id: 2,
        title: "On Hold",
        cards: []
      },
      {
        id: 3,
        title: "Completed",
        cards: []
      },
      {
        id: 4,
        title: "Canceled",
        cards: []
      }
    ]
  };

  const [controlledBoard, setBoard] = useState(board);

  useEffect(() => {
    getProjectTasks({ id: match.params.id });
    console.log(tasks);
  }, []);

  useEffect(() => {
    const mapa = { ...board };

    for (let { id, title, statusId } of tasks) {
      mapa.columns.find((x) => x.id === parseInt(statusId, 10))["cards"].push({ id: id, title: title, description: "........." });
    }
    setBoard(mapa);
  }, [tasks]);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <div className="board" style={{ overflowX: "scroll" }}>
      <Container size="30">
        <Board onCardDragEnd={handleCardMove} disableColumnDrag>
          {controlledBoard}
        </Board>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  loading: state.task.loading
});

export default connect(mapStateToProps, { getProjectTasks })(KanbanBoard);
