import { legacy_createStore , combineReducers ,compose } from "redux";
import { tasksReducer } from "./tasks/tasks.reducer";

const rootReducer = combineReducers({
    taskManager : tasksReducer
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer , composer());