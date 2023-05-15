import React, { useContext } from "react";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import { Card, Container, Table } from "react-bootstrap";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);

  //console.log(todos);

 /*  const handleRemoveTodo = (e) => {
    console.log(e.target.id);
    dispatch({ type: "REMOVE_TODO", id: e.target.id });
  }; */

  return (
    <Container className="container-fluid vh-80 d-flex justify-content-center align-items-center overflow-auto">
      <Card className="shadow-sm w-50 overflow-auto">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((element) => {
                  return (
                    <tr key={element.id}>
                      <td>{element.todo.title}</td>
                      <td>{element.todo.description}</td>
                      <td>{element.todo.dueDate}</td>
                      <td>{element.todo.status}</td>
                      <td>
                        <div
                          className="btn-group d-flex justify-content-center align-items-center"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button type="button" className="btn btn-danger">
                            Delete
                          </button>
                          <button type="button" className="btn btn-warning">
                            Change
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
