import React, { useContext, useState, useEffect } from "react";
import { Card, Container, Accordion} from "react-bootstrap";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import TodoItem from "./TodoItem"
import CardHeader from "./CardHeader";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const handleChangeStatus = (id, status) => {
    dispatch({ type: "CHANGE_STATUS", id, status });
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    //console.log(editingTodo)
  };

  useEffect(() => {
    console.log("editingTodo changed:", editingTodo);
  }, [editingTodo]);

  return (
    <Container className="container-fluid vh-80 d-flex justify-content-center align-items-center overflow-auto">
      <Card className="shadow-sm col-lg-4 ">
       <CardHeader dispatch={dispatch}/>
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
                handleEditTodo={handleEditTodo}
              />
                )
              })}
            </Accordion>
          ) : (
            <div className="text-center mt-3">
              You have finished all your tasks! Take a well-deserved rest.
            </div>
          )}
          <AddNewTodo dispatch={dispatch} editingTodo={editingTodo} setEditingTodo={setEditingTodo}/>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoList;
