

// Action createors (actions)
import {ADD_SAMPLE_MESSAGE, GET_POST_MESSAGES} from "./actionTypes";
import axios from "axios"
import {actionAddError, actionRemoveError} from "./errorActions";


// Sampe API parameters
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=mehmet";

export const addSampleMessage = (message) => {
    console.log("Action Creator: addSampleMessage "+message);
    return {
        type: ADD_SAMPLE_MESSAGE,
        payload: message
    }
};

// By using thunk you can use dispatch and functions
// Get Post Messages // a sample api call
export const getPostMessages = () => dispatch => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
        .then(res => {
            dispatch(actionRemoveError());
            dispatch({
                type: GET_POST_MESSAGES,
                payload: res.data
            })
            }
        )
        .catch(err => {
            dispatch(actionAddError(err));
        });
};