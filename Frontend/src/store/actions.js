import {
  // ToDo Types
  SET_CURRENT_TODO,
} from "./types";

// TODO Actions
export const setCurrentTodo = (todo) => ({
  type: SET_CURRENT_TODO,
  payload: todo,
});
