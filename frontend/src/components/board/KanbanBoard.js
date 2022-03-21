import React, { useState, useEffect } from "react";
import Container from "../utils/Container";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProjectTasks, updateTaskStatus } from "../../actions/task";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import BoardCard from "./BoardCard";
import TaskDetailModal from "../modal/TaskDetailModal";
import { Button } from "antd";
import { showTaskModal } from "../../actions/modal";

const KanbanBoard = ({ match }) => {
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

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const [isVisible, setIsVisible] = useState(false);
  const [controlledBoard, setBoard] = useState(board);

  useEffect(() => {
    dispatch(getProjectTasks({ id: match.params.id }));
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
    dispatch(updateTaskStatus({ id: _card.id, statusId: destination.toColumnId, project: match.params.id }));
  }

  const newTaskHandler = () => {
    dispatch(showTaskModal());
  };

  const showModalHandler = () => {};

  return (
    <div className="board" style={{ overflowX: "scroll" }}>
      <Container size="30">
        <Board
          onCardDragEnd={handleCardMove}
          renderCard={({ id, title, description, priority, due_date }, { dragging }) => <BoardCard id={id} title={title} description={description} priority={priority} due_date={due_date} dragging={dragging} showModalHandler={showModalHandler} />}
          renderColumnHeader={({ title }) => (
            <div style={{ padding: "0 5px", width: "100%" }}>
              <h2>{title}</h2>
              <Button onClick={newTaskHandler} type="primary" style={{ width: "100%", borderRadius: "8px" }}>
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

export default KanbanBoard;
