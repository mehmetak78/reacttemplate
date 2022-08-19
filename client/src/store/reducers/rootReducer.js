
import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer"
import userReducer  from "./userReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers( {
    messages: sampleReducer,
    user: userReducer,
    error: errorReducer
});

export default rootReducer;

