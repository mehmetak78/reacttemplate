import {ADD_SAMPLE_MESSAGE, GET_POST_MESSAGES} from "../actions/actionTypes";
//import _ from "lodash";

const initialState =["Initial Message"];

export default function(state=initialState, action) {
    switch(action.type) {
        case ADD_SAMPLE_MESSAGE:
            return [
                ...state, action.payload
            ];
        case GET_POST_MESSAGES:

            const messages = action.payload.map(post => {
               return post.title
            });

            return [
                ...state, ...messages
            ];


        default:
            return state;
    }
}