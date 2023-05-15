import { createContext, useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";


export const TodoListContext = createContext();


const TodoListContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodoListContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
