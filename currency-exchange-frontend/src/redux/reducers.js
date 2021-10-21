import {combineReducers} from "redux";
import messageReducer from "./messages/messageReducer";
import userReducer from "./messages/userReducer";

const rootReducer = combineReducers({
    messages: messageReducer,
    user: userReducer
});

export default rootReducer;