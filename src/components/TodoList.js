import React, { useContext } from "react";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodoListContext);

  const handleRemoveTodo = (e) => {
    dispatch({ type: "REMOVE_TODO", id: e.target.id });
  };

  return (
    <div>
    <h1> Todo List</h1>
      {todos.length ? (
        todos.map((todo) => {
          return (
            <p id={todo.id} onClick={handleRemoveTodo} key={todo.id}>
              {todo.text}
            </p>
          );
        })
      ) : (
        <div> You have no todos </div>
      )}
      <AddNewTodo dispatch={dispatch} />
    </div>
  );
};

export default TodoList;
