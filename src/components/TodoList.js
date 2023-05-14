import React, { useContext } from "react";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import { Card, Container } from "react-bootstrap";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);

  const handleRemoveTodo = (e) => {
    dispatch({ type: "REMOVE_TODO", id: e.target.id });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Card className="shadow-sm w-50">
        <Card.Header as="h1" className="text-center">
          ToDo List
        </Card.Header>
        <Card.Body>
          {todos.length ? (
            todos.map((todo) => {
              return (
                <p
                  id={todo.id}
                  onClick={handleRemoveTodo}
                  key={todo.id}
                  className="mb-2 m-0"
                >
                  {todo.text}
                  {/* <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button type="button" className="btn btn-danger">
                        Delete
                      </button>
                      <button type="button" className="btn btn-warning">
                        Change
                      </button>
                      <button type="button" className="btn btn-success">
                        Done
                      </button>
                    </div> */}
                </p>
              );
            })
          ) : (
            <div className="text-center mt-3">You have finished all your tasks! Take a well-deserved rest.</div>
          )}
          <AddNewTodo dispatch={dispatch} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoList;
