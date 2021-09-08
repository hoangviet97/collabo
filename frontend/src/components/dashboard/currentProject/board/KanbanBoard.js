import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import { getProjectTasks } from "../../../../actions/task";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";

const KanbanBoard = (props) => {
  useEffect(() => {
    if (props.tasks.length < 1) {
      props.getProjectTasks({ id: props.match.params.id });
    }
  }, []);

  const arr = [
    {
      id: 31,
      title: "test",
      description: "SDfsfsf"
    },
    {
      id: 33,
      title: "test 2",
      description: "SDfsfsf"
    },
    {
      id: 36,
      title: "test3",
      description: "SDfsfsf"
    }
  ];

  const [controlledBoard, setBoard] = useState({
    columns: [
      {
        id: 0,
        title: "Open",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 1,
        title: "In Progress",
        cards: [
          {
            id: 22,
            title: "Drag-n-drop support",
            description: "Move a card between the columns"
          }
        ]
      },
      {
        id: 2,
        title: "On Hold",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 3,
        title: "Completed",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 4,
        title: "Canceled",
        cards: [
          {
            id: 13,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      }
    ]
  });

  const [controlledBoard2, setBoard2] = useState({
    columns: [
      {
        id: 0,
        title: "Open",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 1,
        title: "In Progress",
        cards: [
          {
            id: 22,
            title: "Drag-n-drop support",
            description: "Move a card between the columns"
          }
        ]
      },
      {
        id: 2,
        title: "On Hold",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 3,
        title: "Completed",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      },
      {
        id: 4,
        title: "Canceled",
        cards: [
          {
            id: 13,
            title: "Add card",
            description: "Add capability to add a card in a column"
          }
        ]
      }
    ]
  });

  useEffect(() => {
    const arr = props.tasks.filter((item) => item.statusId === "0");
    const arr2 = props.tasks.filter((item) => item.statusId === "1");
    const arr3 = props.tasks.filter((item) => item.statusId === "2");
    const arr4 = props.tasks.filter((item) => item.statusId === "3");
    const arr5 = props.tasks.filter((item) => item.statusId === "4");

    setBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => (column.id === 0 ? { ...column, cards: arr } : column))
    }));

    setBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => (column.id === 1 ? { ...column, cards: arr2 } : column))
    }));

    setBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => (column.id === 2 ? { ...column, cards: arr3 } : column))
    }));

    setBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => (column.id === 3 ? { ...column, cards: arr4 } : column))
    }));

    setBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => (column.id === 4 ? { ...column, cards: arr5 } : column))
    }));
  }, [props.tasks]);

  const handleCardMove = (_card, source, destination) => {
    console.log(source);
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  };

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
