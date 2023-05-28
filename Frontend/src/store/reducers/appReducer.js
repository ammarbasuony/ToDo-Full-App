import {
  // TODO Types
  SET_CURRENT_TODO,
} from "../types";

const initialState = {
  currentToDo: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentToDo: { ...action.payload },
      };
    default:
      return state;
  }
};

export default appReducer;
