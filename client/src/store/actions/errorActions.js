import {ADD_ERROR, REMOVE_ERROR} from "./actionTypes";

export const actionAddError = (err) => {
    console.log(err);
    let error = {};
    if (err.response) {
        error = {
            code: err.response.status,
            message: err.message,
            fields: err.response.data.errors ? err.response.data.errors : ""
        };
    }
    else {
        error = {
            code: 400,
            message: err.message,
            fields: ""
        }
    }
    return (
    {
        type: ADD_ERROR,
        payload: error
    }
    )
};

export const actionRemoveError = () => {
    const error = {
        code : 0,
        message : "",
        fields : {}
    };
    return (
        {
            type: REMOVE_ERROR,
            payload: error
        }
    )
};


