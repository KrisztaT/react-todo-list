export const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          todo: {
            title: action.todo.title,
            description: action.todo.description,
            date: action.todo.date,
            status: action.todo.status,
          },
            id: Math.random() + 1,
        },
      ];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== Number(action.id));
    default:
      return state;
  }
};
