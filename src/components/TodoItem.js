import React from "react";
import { Accordion } from "react-bootstrap";
import { HourglassSplit, Trash, CheckCircle } from "react-bootstrap-icons";
import { classNameSelector } from "../utils/classNameSelector";
import { STATUS_DONE, STATUS_IN_PROGRESS } from "../constants/statuses";

const TodoItem = ({ todo, handleRemoveTodo, handleChangeStatus }) => {
  return (
    <Accordion.Item eventKey={todo.id.toString()} key={todo.id}>
      <Accordion.Header
        className={classNameSelector(todo.dueDate, todo.status)}
      >
        <div>
          <p>
            <b>{todo.title}</b>
          </p>
          <p className="mb-0">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>{todo.description}</p>
        <div className="d-flex justify-content-around mx-2">
          <p>
            <b>Due Date:</b> {new Date(todo.dueDate).toLocaleDateString()}
          </p>
          <p>
            <b>Status:</b> {todo.status}
          </p>
        </div>
        <div className="d-flex justify-content-evenly">
          <HourglassSplit
            className="mx-2"
            onClick={() => handleChangeStatus(todo.id, STATUS_IN_PROGRESS)}
            size={32}
            color="#f8d84c"
          />
          <CheckCircle
            className="mx-2"
            onClick={() => handleChangeStatus(todo.id, STATUS_DONE)}
            size={32}
            color="#50fab9"
          />
          <Trash
            className="mx-2"
            onClick={() => handleRemoveTodo(todo.id)}
            size={32}
            color="#fd3b3b"
          />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TodoItem;
