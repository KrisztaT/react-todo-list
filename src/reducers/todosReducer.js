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
      case "SORT_BY_STATUS":
        return [...state].sort((a, b) => {
          const statusOrder = {
            "To Do": 1,
            "In Progress": 2,
            "Done": 3,
          };
          if (statusOrder[a.status] === statusOrder[b.status])
          {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA.getTime() - dateB.getTime();
          }
          return statusOrder[a.status] - statusOrder[b.status]
        
      });
      case "EDIT_TODO":
        return state.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );
    default:
      return state;
  }
};
