import { createContext, useReducer, useEffect } from "react";
import { todosReducer } from "../reducers/todosReducer";
import { useLocalStorage } from "react-use";


export const TodoListContext = createContext();


const TodoListContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  
  const [persistentData, setPersistentData] = useLocalStorage("todos",[]);

  useEffect(() => {
      if (persistentData) {
          dispatch({ type: "READ", todos: persistentData })
      }
  }, []) 

  useEffect(() => {
    setPersistentData(todos)
  },[todos])


  return (
    <TodoListContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
