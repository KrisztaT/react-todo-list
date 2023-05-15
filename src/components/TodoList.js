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

  console.log(todos)
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
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Change status/Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((element) => {
                  return (
                    <tr key={element.id}>
                      <td>{element.title}</td>
                      <td>{element.description}</td>
                      <td>{element.dueDate}</td>
                      <td className={`status-${element.id}`}>
                        {element.status}
                      </td>
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
                              handleChangeStatus(element.id, "In Progress")
                            }
                          >
                            In progress
                          </button>
                          <button
                            type="button"
                            className="btn btn-success mx-2"
                            onClick={() =>
                              handleChangeStatus(element.id, "Done")
                            }
                          >
                            Done
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-2"
                            onClick={() => {
                              handleRemoveTodo(element.id);
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
