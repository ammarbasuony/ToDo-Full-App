import {
  // Edit Types
  SET_CURRENT_TODO,
  SET_CURRENT_GROUP,
  SET_CURRENT_USER,

  // Auth Types
  SET_USER,
} from "./types";

// Edit Actions
export const setCurrentTodo = (todo) => ({
  type: SET_CURRENT_TODO,
  payload: todo,
});

export const setCurrentGroup = (group) => ({
  type: SET_CURRENT_GROUP,
  payload: group,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// Auth Actions
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
