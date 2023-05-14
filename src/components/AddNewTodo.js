import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const AddNewTodo = ({ dispatch }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    setNewTodo("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
    <Form onSubmit={handleSubmit} className="w-50 mt-3">
      <Form.Group controlId="todo">
      <Form.Control
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="ToDo"
      />
      </Form.Group>
      <div className="d-flex justify-content-center">
          <Button type="submit" className="mt-3">Add New ToDo</Button>
        </div>
    </Form>
    </div>
  );
};

export default AddNewTodo;
