import React, { useContext} from "react";
import AddNewTodo from "./AddNewTodo";
import { TodoListContext } from "../contexts/TodoLisContext";
import { Card, Container, Accordion } from "react-bootstrap";
import { HourglassSplit, Trash, CheckCircle } from "react-bootstrap-icons";

const TodoList = () => {
  const STATUS_DONE = "Done";
  const STATUS_IN_PROGRESS = "In Progress";

  const { todos, dispatch } = useContext(TodoListContext);


  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const handleChangeStatus = (id, status) => {
    dispatch({ type: "CHANGE_STATUS", id, status });
  };

/*   const sortByDueDate = () => {
    dispatch({ type: "SORT_BY_DUE_DATE" });
  }; */

  const classNameSelector = (dueDate, status) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today && status !== STATUS_DONE) {
      return "overdue";
    } else if (status === STATUS_DONE) {
      return "done";
    } else if (status === STATUS_IN_PROGRESS) {
      return "in-progress";
    }else {
      return "";
    }
  };

  
  return (
    <Container className="container-fluid vh-80 d-flex justify-content-center align-items-center overflow-auto">
      <Card className="shadow-sm col-lg-4 ">
        <Card.Header as="h1" className="text-center sticky-top">
          ToDo List
        </Card.Header>
        <Card.Body>
          {todos.length ? (
            <Accordion defaultActiveKey="0">
              {todos.map((todo) => {
                return (
                  <Accordion.Item
                    eventKey={todo.id.toString()}
                    key={todo.id}
                  >
                    <Accordion.Header
                      className= {classNameSelector(todo.dueDate, todo.status)}
                    >
                      <div>
                      <p><b>{todo.title}</b></p>
                      <p className="mb-0">Due: { new Date(todo.dueDate).toLocaleDateString()}</p>
                    </div> 
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{todo.description}</p>
                      <div className="d-flex justify-content-around mx-2"><p><b>Due Date:</b> {new Date(todo.dueDate).toLocaleDateString()}</p>
                      <p><b>Status:</b> {todo.status}</p>
                      </div>
                        <div className="d-flex justify-content-evenly">
                        <HourglassSplit
                          className="mx-2"
                          onClick={() =>
                            handleChangeStatus(todo.id, STATUS_IN_PROGRESS)
                          }
                          size={32}
                          color="#f8d84c"
        
                        />
                        <CheckCircle
                          className="mx-2"
                          onClick={() => handleChangeStatus(todo.id, STATUS_DONE)}
                          size={32}
                          color="#50fab9"
                        />
                        <Trash
                          className="mx-2"
                          onClick={() => handleRemoveTodo(todo.id)}
                          size={32}
                          color="#fd3b3b"
                        />
                     
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
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
