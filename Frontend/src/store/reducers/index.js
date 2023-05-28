import { combineReducers } from "redux";

// Reducers
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
