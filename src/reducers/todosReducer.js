import { v4 as uuidv4 } from "uuid";

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "READ":
      return action.todos;
    case "ADD_TODO":
      return [
        ...state,
        {
          title: action.todo.title,
          description: action.todo.description,
          dueDate: action.todo.dueDate,
          status: action.todo.status,
          id: uuidv4(),
        },
      ];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "CHANGE_STATUS":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            status: action.status,
          };
        }
        return todo;
      });
    case "SORT_BY_DUE_DATE":
      return [...state].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA.getTime() - dateB.getTime();
      });
    default:
      return state;
  }
};
