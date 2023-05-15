export const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          todo: {
            title: action.todo.title,
            description: action.todo.description,
            dueDate: action.todo.dueDate,
            status: action.todo.status,
          },
            id: Math.random() + 1,
        },
      ];
    default:
      return state;
  }
};
