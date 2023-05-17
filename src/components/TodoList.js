import React, { useContext } from "react";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import { Card, Container, Table } from "react-bootstrap";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);

  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const handleChangeStatus = (id, status) => {
    dispatch({ type: "CHANGE_STATUS", id, status });
  };

  const sortByDueDate = () => {
    dispatch({ type: "SORT_BY_DUE_DATE" });
  };

  const classNameSelector = (dueDate, status) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today && status !== "Done") {
      return "overdue";
    } else if (status === "Done") {
      return "done";
    } else {
      return "";
    }
  };

  return (
    <Container className="container-fluid vh-80 d-flex justify-content-center align-items-center overflow-auto">
      <Card className="shadow-sm w-60">
        <Card.Header as="h1" className="text-center sticky-top">
          ToDo List
        </Card.Header>
        <Card.Body>
          {todos.length ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th onClick={sortByDueDate}>Due Date</th>
                  <th>Status</th>
                  <th>Change status/Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => {
                  return (
                    <tr
                      key={todo.id}
                      className={classNameSelector(todo.dueDate, todo.status)}
                    >
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.dueDate}</td>
                      <td>{todo.status}</td>
                      <td>
                        <div
                          className="btn-group d-flex justify-content-center align-items-center"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            type="button"
                            className="btn btn-warning mx-2"
                            onClick={() =>
                              handleChangeStatus(todo.id, "In Progress")
                            }
                          >
                            In progress
                          </button>
                          <button
                            type="button"
                            className="btn btn-success mx-2"
                            onClick={() => handleChangeStatus(todo.id, "Done")}
                          >
                            Done
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-2"
                            onClick={() => {
                              handleRemoveTodo(todo.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center mt-3">
              You have finished all your tasks! Take a well-deserved rest.
            </div>
          )}

          <AddNewTodo dispatch={dispatch} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoList;
