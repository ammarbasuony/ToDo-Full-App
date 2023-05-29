import {
  // Edit Types
  SET_CURRENT_TODO,
  SET_CURRENT_GROUP,
  SET_CURRENT_USER,

  // Auth Types
  SET_USER,
} from "../types";

const initialState = {
  currentToDo: {},
  currentGroup: {},
  currentUser: {},
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentToDo: { ...action.payload },
      };
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: { ...action.payload },
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
