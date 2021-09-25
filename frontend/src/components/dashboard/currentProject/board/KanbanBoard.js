import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import { getProjectTasks, updateTaskStatus } from "../../../../actions/task";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import BoardCard from "./BoardCard";
import TaskDetailModal from "../../../modal/TaskDetailModal";
import { Button } from "antd";

const KanbanBoard = ({ match, tasks, getProjectTasks, updateTaskStatus }) => {
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

    for (let { id, title, description, statusId, priorityName, due_date } of tasks) {
      mapa.columns.find((x) => x.id === parseInt(statusId, 10))["cards"].push({ id: id, title: title, description: description, priority: priorityName, due_date });
    }
    setBoard(mapa);
  }, [tasks]);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
    console.log(_card);
    //
    updateTaskStatus({ id: _card.id, statusId: destination.toColumnId, project: match.params.id });
  }

  return (
    <div className="board" style={{ overflowX: "scroll" }}>
      <Container size="30">
        <Board
          onCardDragEnd={handleCardMove}
          renderCard={({ title, description, priority, due_date }, { dragging }) => <BoardCard title={title} description={description} priority={priority} due_date={due_date} dragging={dragging} />}
          renderColumnHeader={({ title }) => (
            <div style={{ padding: "0 5px", width: "100%" }}>
              <h2>{title}</h2>
              <Button type="primary" style={{ width: "100%", borderRadius: "8px" }}>
                Add New Card
              </Button>
            </div>
          )}
        >
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

export default connect(mapStateToProps, { getProjectTasks, updateTaskStatus })(KanbanBoard);
