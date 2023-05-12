import { useState } from "react";

const AddNewTodo = ({ dispatch }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">To do</label>
      <input
        type="text"
        value={newTodo}
        id="todo"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default AddNewTodo;
