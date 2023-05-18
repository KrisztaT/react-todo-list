import { createContext, useReducer, useEffect } from "react";
import { todosReducer } from "../reducers/todosReducer";
import { useLocalStorage } from "react-use";

export const TodoListContext = createContext();

const TodoListContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const [persistentData, setPersistentData] = useLocalStorage("todos", []);

  useEffect(() => {
    if (persistentData) {
      dispatch({ type: "READ", todos: persistentData });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPersistentData(todos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return (
    <TodoListContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
