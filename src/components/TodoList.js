import React, { useContext } from "react";
import { Card, Container, Accordion} from "react-bootstrap";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import TodoItem from "./TodoItem"
import Header from "./Header";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);

  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const handleChangeStatus = (id, status) => {
    dispatch({ type: "CHANGE_STATUS", id, status });
  };

 

  return (
    <Container className="container-fluid vh-80 d-flex justify-content-center align-items-center overflow-auto">
      <Card className="shadow-sm col-lg-4 ">
       <Header dispatch={dispatch}/>
        <Card.Body>
          {todos.length ? (
            <Accordion defaultActiveKey="0">
              {todos.map((todo) => {
                return(
                <TodoItem
                key={todo.id}
                todo={todo}
                handleRemoveTodo={handleRemoveTodo}
                handleChangeStatus={handleChangeStatus}
              />
                )
              })}
            </Accordion>
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
