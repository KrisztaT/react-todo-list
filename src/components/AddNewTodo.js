import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddNewTodo = ({ dispatch }) => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "", dueDate: "", status: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(newTodo);
    dispatch({
      type: "ADD_TODO",
      todo: {
        title: newTodo.title,
        description: newTodo.description,
        dueDate: newTodo.dueDate,
        status: newTodo.status,
      },
    });
    setNewTodo({ title: "", description: "", dueDate: "", status: "" });

  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Form onSubmit={handleSubmit} className="w-50 mt-3">
        <Form.Group className="mb-1">
          <Form.Control
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Control
            type="date"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Control
            as="select"
            defaultValue="Choose status..."
            value={newTodo.status}
            onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
          >
            <option>Choose status...</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="mt-3">
            Add New ToDo
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewTodo;
