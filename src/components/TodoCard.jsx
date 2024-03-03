import React from "react";

export default function TodoCard(props) {
  const {
    children,
    handleDeleteTodo,
    index,
    handleIndexTodo,
    handleUpShiftTodo,
  } = props;

  return (
    <li className="todoItem">
      {children}
      <div className="actionsContainer">
        <button
          onClick={() => {
            handleUpShiftTodo(index);
          }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
        <button
          onClick={() => {
            handleIndexTodo(index);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(index);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
