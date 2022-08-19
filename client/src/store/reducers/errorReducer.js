
import {ADD_ERROR, REMOVE_ERROR} from "../actions/actionTypes";

const initialState = {
    code: 0,
    message: "",
    fields: {

    }
};

export default function(state=initialState, action) {
    switch(action.type) {
        case ADD_ERROR:
            return action.payload;
        case REMOVE_ERROR:
            return action.payload;
        default:
            return state;
    }
}