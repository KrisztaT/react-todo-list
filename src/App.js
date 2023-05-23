import TodoList from "./components/TodoList";
import TodoListContextProvider from "./contexts/TodoLisContext";
import "./App.css"
import axios from "axios";

function App() {
  return (
    <div className="App">
      <TodoListContextProvider>
        <TodoList />
      </TodoListContextProvider>
    </div>
  );
}

export default App;
