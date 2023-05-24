import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddNewTodo = ({ dispatch, editingTodo, setEditingTodo }) => {
  const [newTodo, setNewTodo] = useState(
    editingTodo || { title: "", description: "", dueDate: "", status: "To Do" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      dispatch({
        type: "EDIT_TODO",
        todo: {
          id: editingTodo.id,
          title: newTodo.title,
          description: newTodo.description,
          dueDate: newTodo.dueDate,
          status: newTodo.status,
        },
      });
      // Reset the editingTodo state in the parent component after editing is done
      setEditingTodo(null);
    } else {
      dispatch({
        type: "ADD_TODO",
        todo: {
          title: newTodo.title,
          description: newTodo.description,
          dueDate: newTodo.dueDate,
          status: newTodo.status,
        },
      });
    }
    setNewTodo({ title: "", description: "", dueDate: "", status: "To Do" });
  };
  
  useEffect(() => {
    setNewTodo(
      editingTodo || { title: "", description: "", dueDate: "", status: "To Do" }
    );
  }, [editingTodo]);


  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Form onSubmit={handleSubmit} className="w-75 mt-3">
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
            onChange={(e) =>
              setNewTodo({ ...newTodo, dueDate: e.target.value })
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="outline-secondary" type="submit" className="btn mt-3">
          {editingTodo ? "Edit Todo" : "Add Todo"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewTodo;
