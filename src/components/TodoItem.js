import React from "react";
import { Accordion } from "react-bootstrap";
import {
  HourglassSplit,
  Trash,
  CheckCircle,
  PencilSquare,
} from "react-bootstrap-icons";
import { classNameSelector } from "../utils/classNameSelector";
import { STATUS_DONE, STATUS_IN_PROGRESS } from "../constants/statuses";

const TodoItem = ({
  todo,
  handleRemoveTodo,
  handleChangeStatus,
  handleEditTodo,
}) => {
  return (
    <Accordion.Item eventKey={todo.id.toString()} key={todo.id}>
      <Accordion.Header
        className={classNameSelector(todo.dueDate, todo.status)}
      >
        <div>
          <p className="mb-0">
            <b className="fs-5 text-dark">{todo.title}</b>
          </p>
          <p className="mb-0 text-dark">
            <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div>
          <p className="fs-5 mb-3 text-dark">{todo.description}</p>
          <div>
            <p className="mb-1 ">
              <b className="">Due Date:</b>{" "}
              {new Date(todo.dueDate).toLocaleDateString()}
            </p>
            <p className="mb-3">
              <b className="">Status:</b> {todo.status}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-evenly">
          <HourglassSplit
            className="icon-hover mx-2"
            onClick={() => handleChangeStatus(todo.id, STATUS_IN_PROGRESS)}
            size={32}
            color="#FFC914"
            title= "In-progress status"
          />
          <CheckCircle
            className="icon-hover mx-2"
            onClick={() => handleChangeStatus(todo.id, STATUS_DONE)}
            size={32}
            color="#76B041"
            title="Done status"
          />
          <PencilSquare
            className="icon-hover mx-2"
            onClick={() => handleEditTodo(todo.id)}
            size={32}
            color="#12918F"
            title="Edit todo"
          />
          <Trash
            className="icon-hover mx-2"
            onClick={() => handleRemoveTodo(todo.id)}
            size={32}
            color="#E4572E"
            title="Delete todo"

          />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TodoItem;
