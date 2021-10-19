import {combineReducers } from "redux";
import messageReducer from "./messages/messageReducer";

const rootReducer = combineReducers({
    messages: messageReducer
});

export default rootReducer;