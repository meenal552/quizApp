import { combineReducers } from "redux";
import mcqReducer from "./mcqReducer";

export default combineReducers({
  mcqs: mcqReducer,
});
